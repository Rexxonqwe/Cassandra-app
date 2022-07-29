const cassandra = require("cassandra-driver");
const client = new cassandra.Client({
  contactPoints: ["127.0.0.1"],
  localDataCenter: "datacenter1",
});
client.connect((err, results) => {
  console.log("DB connection successfull!");
});

const selectQuery = "SELECT * FROM people.friends";

exports.getAllFriends = async (req, res) => {
  try {
    const results = await client.execute(selectQuery);
    res.status(200).json({
      status: "success",
      data: {
        friends: results.rows,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.stack,
    });
  }
};

exports.createFriends = async (req, res) => {
  try {
    const postQuery =
      "INSERT INTO people.friends(id, email, first_name, last_name) VALUES(?, ?, ?,?)";
    const id = cassandra.types.uuid();
    const newFriend = await client.execute(postQuery, [
      id,
      req.body.email,
      req.body.first_name,
      req.body.last_name,
    ]);
    res.status(201).json({
      status: "success",
      data: {
        newFriend: newFriend.rows,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.stack,
    });
  }
};

exports.updateFriend = async (req, res) => {
  const id = req.params.id;
  const updateQuery = `UPDATE people.friends SET email = ?, first_name = ?, last_name = ? WHERE id = ${id}`;
  try {
    const updateFri = await client.execute(updateQuery, [
      req.body.email,
      req.body.first_name,
      req.body.last_name,
    ]);
    res.status(204).json({
      status: "success",
      message: "friend is updated successfully!",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.stack,
    });
  }
};

exports.deleteFriend = async (req, res) => {
  const deleteQuery = `DELETE FROM people.friends WHERE id = ${req.params.id}`;
  try {
    await client.execute(deleteQuery);
    res.status(204).json({
      status: "deleted",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.stack,
    });
  }
};
