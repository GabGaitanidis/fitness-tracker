const pool = require("./pool.js");

async function fetchExercises(userId) {
  const { rows, rowCount } = await pool.query(
    "SELECT * FROM exercises WHERE user_id = $1",
    [userId],
  );
  if (!rowCount) {
    return {
      success: false,
      message: "Exercises not found",
    };
  }
  return { success: true, exercises: rows };
}

async function insertExercise(userId, data) {
  const { name, category } = data;
  const values = [name, category, userId];
  const { rows, rowCount } = await pool.query(
    "INSERT INTO exercises (name, category, user_id) VALUES ($1,$2,$3) RETURNING *",
    values,
  );
  if (!rowCount) {
    return {
      success: false,
      message: "Exercises not found",
    };
  }
  return { success: true, exercises: rows };
}

async function updateExercise(userId, id, data) {
  const keys = Object.keys(data);
  if (keys.length === 0) return { success: false, message: "Empty data body" };
  const setClause = keys
    .map((key, index) => {
      `${key} = $${index + 1}`;
    })
    .join(", ");
  const values = Object.values(data);
  values.push(userId, id);
  const query = `UPDATE exercises SET ${setClause} WHERE user_id = $${values.length - 1} AND id = $${values.length}`;
  const { rows, rowCount } = await pool.query(query, values);
  if (!rowCount) {
    return {
      success: false,
      message: "Exercise not found",
    };
  }
  return { success: true, exercises: rows };
}

async function removeExercise(userId, id) {
  const exercise = await pool.query(
    "DELETE FROM exercises WHERE user_id = $1 AND id = $2",
    [userId, id],
  );
  if (rowCount === 0) {
    return {
      success: false,
      message: "Exercise not found",
    };
  }
  return { success: true, message: "Exercise deleted!" };
}

module.exports = {
  fetchExercises,
  insertExercise,
  updateExercise,
  removeExercise,
};
