const express = require("express");
const friendsRouter = require("./routes/friendsRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/friends", friendsRouter);

module.exports = app;
