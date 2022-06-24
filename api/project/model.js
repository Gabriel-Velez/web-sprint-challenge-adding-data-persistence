// build your `Project` model here
const db = require("../../data/dbConfig");

async function findProject() {
  const rows = await db("projects");

  if (rows.length == 0) return null;

  rows.forEach((row) => {
    if (row.project_completed === 1) row.project_completed = Boolean(row.project_completed);
    else row.project_completed = Boolean(row.project_completed);
  });
  return rows;
}

async function findProjectById(id) {
  const rows = await db("projects")
    .leftJoin("tasks", "tasks.project_id", "projects.project_id")
    .select("project_name", "project_description", "project_completed")
    .where("projects.project_id", id);

  const result = {
    project_completed: Boolean(rows[0].project_completed),
    project_description: rows[0].project_description,
    project_name: rows[0].project_name,
  };

  return result;
}

function addProject(project) {
  return db("projects")
    .insert(project)
    .then(([id]) => {
      return findProjectById(id);
    });
}

module.exports = {
  findProject,
  findProjectById,
  addProject,
};
