// build your `/api/tasks` router here
const express = require("express");
const Task = require("./model");

const router = express.Router();

router.get("/", (req, res, next) => {
  Task.findTasks()
    .then((tasks) => {
      res.json(tasks);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  Task.addTask(req.body)
    .then((newTask) => {
      res.status(201).json(newTask);
    })
    .catch(next);
});

module.exports = router;
