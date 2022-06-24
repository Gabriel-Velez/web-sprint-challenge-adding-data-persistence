// build your `Task` model here
const db = require("../../data/dbConfig");

async function findTasks() {
  const rows = await db("tasks")
    .join("projects", "projects.project_id", "tasks.project_id")
    .select(
      "tasks.task_notes",
      "tasks.task_completed",
      "tasks.task_description",
      "projects.project_description",
      "projects.project_name"
    );
  if (rows.length === 0) {
    return null;
  }
  rows.forEach((row) => {
    row.task_completed = Boolean(row.task_completed);
  });
  return rows;
}

async function findTaskById(id) {
  const row = await db("tasks").where({ task_id: id }).first();
  row.task_completed = Boolean(row.task_completed);
  return row;
}

function addTask(task) {
  return db("tasks")
    .insert(task)
    .then(([id]) => {
      return findTaskById(id);
    });
}

module.exports = {
  findTasks,
  addTask,
  findTaskById,
};
