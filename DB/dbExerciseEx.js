const pool = require("./pool.js");

async function fetchExerciseExecutions(activityliftid) {
  const { rows, rowCount } = await pool.query(
    "SELECT * FROM exerciseexecution WHERE activityliftid = $1",
    [activityliftid],
  );

  if (rowCount === 0) {
    return {
      success: false,
      message: "Exercise Executions not found",
    };
  }
  return { success: true, exerciseExecutions: rows };
}

async function insertExerciseExecutions(data) {
  const { activityliftid, exerciseid, kg, reps, sets } = data;
  const values = [activityliftid, exerciseid, kg, reps, sets];

  const { rows, rowCount } = await pool.query(
    "INSERT INTO exerciseexecution (activityliftid, exerciseid, kgs, reps, sets) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    values,
  );

  if (rowCount === 0) {
    return {
      success: false,
      message: "Failed to create exercise execution",
    };
  }
  return { success: true, exerciseExecution: rows[0] };
}

async function updateExerciseExecution(id, data) {
  const keys = Object.keys(data);
  if (keys.length === 0) return { success: false, message: "Empty data body" };

  const setClause = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");

  const values = Object.values(data);
  values.push(id);

  const query = `UPDATE exerciseexecution SET ${setClause} WHERE id = $${values.length} RETURNING *`;

  const { rows, rowCount } = await pool.query(query, values);

  if (rowCount === 0) return { success: false, message: "Execution not found" };
  return { success: true, exerciseExecution: rows[0] };
}

async function removeExerciseExecution(id) {
  const { rowCount } = await pool.query(
    "DELETE FROM exerciseexecution WHERE id = $1",
    [id],
  );

  if (rowCount === 0) {
    return {
      success: false,
      message: "Exercise Execution not found",
    };
  }
  return { success: true, message: "Exercise Execution deleted!" };
}

module.exports = {
  fetchExerciseExecutions,
  insertExerciseExecutions,
  updateExerciseExecution,
  removeExerciseExecution,
};
