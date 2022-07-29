const express = require("express");
const friendsController = require("../controllers/friendsController");

const router = express.Router();
router
  .route("/")
  .get(friendsController.getAllFriends)
  .post(friendsController.createFriends);

router
  .route("/:id")
  .patch(friendsController.updateFriend)
  .delete(friendsController.deleteFriend);
module.exports = router;
