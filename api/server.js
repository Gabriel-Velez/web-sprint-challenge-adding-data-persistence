const express = require("express");

const ProjectRouter = require("./project/router.js");
const ResourceRouter = require("./resource/router.js");
const TaskRouter = require("./task/router.js");

const server = express();

server.use(express.json());

server.use("/api/projects", ProjectRouter);
server.use("/api/resources", ResourceRouter);
server.use("/api/tasks", TaskRouter);

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = server;
