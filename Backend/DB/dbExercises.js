const pool = require("./pool.js");
const { NotFoundError, BadRequestError } = require("../Errors/errors.js");
const validQueryGenerator = require("../utils/validQueryGenerator.js");

async function fetchExercises(userId) {
  const { rows, rowCount } = await pool.query(
    "SELECT * FROM exercises WHERE user_id = $1",
    [userId],
  );

  if (rowCount === 0) {
    throw new NotFoundError("Exercises not found");
  }

  return rows;
}

async function insertExercise(userId, data) {
  const { name, category } = data;
  const values = [name, category, userId];
  const { rows, rowCount } = await pool.query(
    "INSERT INTO exercises (name, category, user_id) VALUES ($1,$2,$3) RETURNING *",
    values,
  );

  if (rowCount === 0) {
    throw new BadRequestError("Could not create exercise");
  }

  return rows[0];
}

async function updateExercise(userId, id, data) {
  ALLOWED_FIELDS = ["name", "category"];
  const [setClause, values] = validQueryGenerator(
    ALLOWED_FIELDS,
    id,
    data,
    userId,
  );

  const query = `UPDATE exercises SET ${setClause} WHERE user_id = $${values.length - 1} AND id = $${values.length} RETURNING *`;

  const { rows, rowCount } = await pool.query(query, values);

  if (rowCount === 0) {
    throw new NotFoundError("Exercise not found");
  }

  return rows[0];
}

async function removeExercise(userId, id) {
  const { rowCount } = await pool.query(
    "DELETE FROM exercises WHERE user_id = $1 AND id = $2",
    [userId, id],
  );

  if (rowCount === 0) {
    throw new NotFoundError("Exercise not found");
  }

  return true;
}

module.exports = {
  fetchExercises,
  insertExercise,
  updateExercise,
  removeExercise,
};
