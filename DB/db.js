const pool = require("./pool.js");

async function fetchUsers(sortBy, order, username = undefined, page = 1) {
  const limit = 3;
  const offset = (page - 1) * limit;

  if (!username) {
    const query = `
      SELECT * FROM users 
      ORDER BY ${sortBy} ${order} 
      LIMIT $1 OFFSET $2
    `;

    const users = await pool.query(query, [limit, offset]);
    return users.rows;
  }
  const user = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return user.rows;
}

async function fetchUserCols(id, queries) {
  if (queries.length) {
    const allowedCols = ["username", "age", "weight", "height", "city"];
    const validQueries = queries.filter((en) => allowedCols.includes(en));
    const queryPromises = validQueries.map((col) => {
      return pool.query(`SELECT ${col} FROM users WHERE id = $1`, [id]);
    });

    const results = await Promise.all(queryPromises);
    return results.map((res) => res.rows);
  } else {
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return user.rows;
  }
}

async function insertUser(data) {
  const bcrypt = require("bcrypt");
  const { username, email, password } = data;
  const user = await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at",
    [username, email, password],
  );
  return user.rows;
}

async function deleteUser(id) {
  const user = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [
    id,
  ]);
  return user.rows;
}

async function updateBodyInfo(data, id) {
  const entries = Object.entries(data);
  if (entries.length === 0) return null;

  const dataPromises = entries.map(([column, value]) => {
    return pool.query(`UPDATE users SET ${column} = $1 WHERE id = $2`, [
      value,
      id,
    ]);
  });

  await Promise.all(dataPromises);

  const finalResult = await pool.query("SELECT * FROM users WHERE id = $1", [
    id,
  ]);

  return finalResult.rows[0];
}

async function fetchUser(username) {
  const user = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  if (!user.rowCount) {
    return { success: false, message: "Activities not found or unauthorized" };
  }
  return user.rows[0];
}
module.exports = {
  insertUser,
  fetchUser,
  fetchUsers,
  deleteUser,
  updateBodyInfo,
  fetchUserCols,
};
