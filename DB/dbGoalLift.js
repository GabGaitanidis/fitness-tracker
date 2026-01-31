const { BadRequestError, NotFoundError } = require("../Errors/errors");
const pool = require("./pool.js");
const validQueryGenerator = require("../utils/validQueryGenerator.js");

async function fetchGoalLift(userId) {
  const { rows, rowCount } = await pool.query(
    "SELECT * FROM goals_lift WHERE user_id = $1",
    [userId],
  );
  if (!rowCount) {
    throw new NotFoundError("Goals not found");
  }
  return rows;
}

async function createGoalLift(data) {
  const { user_id, started, due_to, kg_goal, notes, name, exercise_id } = data;
  const values = [user_id, started, due_to, kg_goal, notes, name, exercise_id];

  const { rows, rowCount } = await pool.query(
    "INSERT INTO goals_lift (user_id, started, due_to, kg_goal, notes, name, exercise_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    values,
  );

  if (!rowCount) {
    throw new BadRequestError("Could not create goal");
  }
  return rows[0];
}

async function updateLiftGoal(userId, id, data) {
  const fields = ["due_to", "kg_goal", "notes", "name", "exercise_id"];
  const [setClause, values] = validQueryGenerator(fields, userId, id, data);

  const query = `UPDATE goals_lift SET ${setClause} WHERE user_id = $${values.length - 1} AND id = $${values.length} RETURNING *`;

  const { rows } = await pool.query(query, values);
  if (rows.length === 0) {
    throw new NotFoundError("Goal not found or unauthorized");
  }
  return rows[0];
}

async function deleteLiftGoal(userId, id) {
  const { rowCount } = await pool.query(
    "DELETE FROM goals_lift WHERE user_id = $1 AND id = $2",
    [userId, id],
  );

  if (rowCount === 0) {
    throw new NotFoundError("Goal not found");
  }

  return true;
}

module.exports = {
  fetchGoalLift,
  createGoalLift,
  updateLiftGoal,
  deleteLiftGoal,
};
