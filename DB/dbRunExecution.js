const pool = require("./pool.js");
const { NotFoundError, BadRequestError } = require("../Errors/errors.js");
const validQueryGenerator = require("../utils/validQueryGenerator.js");

async function fetchRunExecutions(activityRunId) {
  const { rows, rowCount } = await pool.query(
    "SELECT * FROM runexecution WHERE activityrunid = $1",
    [activityRunId],
  );
  if (rowCount === 0) {
    throw new NotFoundError("Run executions not found");
  }
  return rows;
}

async function insertRunExecution(data) {
  const { activityrunid, km, duration } = data;
  const { rows, rowCount } = await pool.query(
    "INSERT INTO runexecution (activityrunid, km, duration) VALUES ($1, $2, $3) RETURNING *",
    [activityrunid, km, duration],
  );
  if (rowCount === 0) {
    throw new BadRequestError("Invalid data");
  }
  return rows;
}

async function updateRunExecution(id, data) {
  const ALLOWED_FIELDS = ["km", "duration"];
  const [setClause, values] = validQueryGenerator(ALLOWED_FIELDS, id, data);
  const query = `UPDATE runexecution SET ${setClause} WHERE id = $${values.length} RETURNING *`;

  const { rows, rowCount } = await pool.query(query, values);

  if (rowCount === 0) throw new NotFoundError("Execution not found");

  return rows[0];
}

async function removeRunExecution(id) {
  const { rowCount } = await pool.query(
    "DELETE FROM runexecution WHERE id = $1",
    [id],
  );

  if (rowCount === 0) {
    throw new NotFoundError("Run Execution not found");
  }

  return true;
}
module.exports = {
  fetchRunExecutions,
  insertRunExecution,
  updateRunExecution,
  removeRunExecution,
};
