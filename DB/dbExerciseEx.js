const pool = require("./pool.js");
const { NotFoundError, BadRequestError } = require("../Errors/errors.js");

async function fetchExerciseExecutions(activityliftid) {
  const { rows, rowCount } = await pool.query(
    "SELECT * FROM exerciseexecution WHERE activityliftid = $1",
    [activityliftid],
  );

  if (rowCount === 0) {
    throw new NotFoundError("Exercise Executions not found");
  }

  return rows;
}

async function insertExerciseExecutions(data) {
  const { activityliftid, exerciseid, kg, reps, sets } = data;
  const values = [activityliftid, exerciseid, kg, reps, sets];

  const { rows, rowCount } = await pool.query(
    "INSERT INTO exerciseexecution (activityliftid, exerciseid, kgs, reps, sets) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    values,
  );

  if (rowCount === 0) {
    throw new BadRequestError("Failed to create exercise execution");
  }

  return rows[0];
}

async function updateExerciseExecution(id, data) {
  ALLOWED_FIELDS = ["kgs", "reps", "sets"];
  const [setClause, values] = validQueryGenerator(
    ALLOWED_FIELDS,
    userId,
    id,
    data,
  );
  const query = `UPDATE exerciseexecution SET ${setClause} WHERE id = $${values.length} RETURNING *`;

  const { rows, rowCount } = await pool.query(query, values);

  if (rowCount === 0) throw new NotFoundError("Execution not found");

  return rows[0];
}

async function removeExerciseExecution(id) {
  const { rowCount } = await pool.query(
    "DELETE FROM exerciseexecution WHERE id = $1",
    [id],
  );

  if (rowCount === 0) {
    throw new NotFoundError("Exercise Execution not found");
  }

  return true;
}

module.exports = {
  fetchExerciseExecutions,
  insertExerciseExecutions,
  updateExerciseExecution,
  removeExerciseExecution,
};
