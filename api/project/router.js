// build your `/api/projects` router here
const express = require("express");
const Project = require("./model");

const router = express.Router();

router.get("/", (req, res, next) => {
  Project.findProject()
    .then((projects) => {
      res.json(projects);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  Project.addProject(req.body)
    .then((newProject) => {
      res.status(201).json(newProject);
    })
    .catch(next);
});

module.exports = router;
