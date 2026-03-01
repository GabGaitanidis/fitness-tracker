const pool = require("./pool.js");
const { NotFoundError, BadRequestError } = require("../Errors/errors.js");

async function fetchUsers(sortBy, order, username = undefined, page = 1) {
  const limit = 3;
  const offset = (page - 1) * limit;

  if (!username) {
    const query = `
      SELECT id, username, email, created_at FROM users 
      ORDER BY ${sortBy} ${order} 
      LIMIT $1 OFFSET $2
    `;
    const { rows } = await pool.query(query, [limit, offset]);
    return rows;
  }

  const { rows } = await pool.query(
    "SELECT id, username, email, created_at FROM users WHERE username = $1",
    [username],
  );
  return rows;
}

async function fetchUserCols(id, queries) {
  if (queries.length > 0) {
    const allowedCols = ["username", "age", "weight", "height", "city"];
    const validQueries = queries.filter((col) => allowedCols.includes(col));

    if (validQueries.length === 0)
      throw new BadRequestError("No valid columns requested");

    const query = `SELECT ${validQueries.join(", ")} FROM users WHERE id = $1`;
    const { rows, rowCount } = await pool.query(query, [id]);

    if (rowCount === 0) throw new NotFoundError("User not found");
    return rows[0];
  } else {
    const { rows, rowCount } = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id],
    );
    if (rowCount === 0) throw new NotFoundError("User not found");
    return rows[0];
  }
}

async function insertUser(data) {
  const { username, email, password } = data;
  const { rows } = await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at",
    [username, email, password],
  );
  return rows[0];
}

async function deleteUser(id) {
  const { rows, rowCount } = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING id",
    [id],
  );
  if (rowCount === 0) throw new NotFoundError("User not found");
  return rows[0];
}

async function updateBodyInfo(data, id) {
  const keys = Object.keys(data);
  if (keys.length === 0) throw new BadRequestError("Empty data body");

  const setClause = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");
  const values = Object.values(data);
  values.push(id);

  const query = `UPDATE users SET ${setClause} WHERE id = $${values.length} RETURNING *`;
  const { rows, rowCount } = await pool.query(query, values);

  if (rowCount === 0) throw new NotFoundError("User not found");
  return rows[0];
}

async function fetchUser(username) {
  const { rows, rowCount } = await pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username],
  );

  if (rowCount === 0) throw new NotFoundError("User not found");
  return rows[0];
}

module.exports = {
  insertUser,
  fetchUser,
  fetchUsers,
  deleteUser,
  updateBodyInfo,
  fetchUserCols,
};
