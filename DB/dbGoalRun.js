const { BadRequestError, NotFoundError } = require("../Errors/errors");
const pool = require("./pool.js");
const validQueryGenerator = require("../utils/validQueryGenerator.js");

async function fetchGoalRun(userId) {
  const { rows, rowCount } = await pool.query(
    "SELECT * FROM goals_running WHERE user_id = $1",
    [userId],
  );
  if (!rowCount) throw new NotFoundError("Goals not found");
  return rows;
}

async function createGoalRun(data) {
  const { user_id, started, due_to, km_goal, notes, name } = data;
  const values = [user_id, started, due_to, km_goal, notes, name];

  const { rows, rowCount } = await pool.query(
    "INSERT INTO goals_running (user_id, started, due_to, km_goal, notes, name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    values,
  );

  if (!rowCount) throw new BadRequestError("Could not create goal");
  return rows[0];
}

async function updateRunGoal(userId, id, data) {
  const ALLOWED_FIELDS = ["due_to", "km_goal", "notes", "name"];
  const [setClause, values] = validQueryGenerator(
    ALLOWED_FIELDS,
    id,
    data,
    userId,
  );
  const query = `UPDATE goals_running SET ${setClause} WHERE user_id = $${values.length - 1} AND id = $${values.length} RETURNING *`;

  const { rows } = await pool.query(query, values);
  if (rows.length === 0)
    throw new NotFoundError("Goal not found or unauthorized");
  return rows[0];
}

async function deleteRunGoal(userId, id) {
  const { rowCount } = await pool.query(
    "DELETE FROM goals_running WHERE user_id = $1 AND id = $2",
    [userId, id],
  );
  if (rowCount === 0) throw new NotFoundError("Goal not found");
  return true;
}

module.exports = { fetchGoalRun, createGoalRun, updateRunGoal, deleteRunGoal };
