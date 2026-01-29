const pool = require("./pool.js");

async function fetchActivityRuns(
  userId,
  page,
  sortBy,
  order,
  category = undefined,
) {
  const limit = 3;
  const offset = (page - 1) * limit;

  if (!category) {
    const { rows, rowCount } = await pool.query(
      `SELECT id, user_id, name, date, location, duration::text AS duration, category 
       FROM activityrun 
       WHERE user_id = $1 
       ORDER BY ${sortBy} ${order} NULLS LAST 
       LIMIT ${limit} OFFSET ${offset}`,
      [userId],
    );

    if (rowCount === 0)
      return { success: false, message: "Activities not found" };
    return { success: true, activityRuns: rows };
  } else {
    const { rows: catRows } = await pool.query(
      "SELECT DISTINCT category FROM activityrun WHERE user_id = $1",
      [userId],
    );

    const valid_category = catRows.some((r) => r.category === category)
      ? category
      : "Walking";

    const { rows, rowCount } = await pool.query(
      `SELECT id, user_id, name, date, location, duration::text AS duration, category 
       FROM activityrun 
       WHERE user_id = $1 AND category = $2
       ORDER BY ${sortBy} ${order} NULLS LAST 
       LIMIT ${limit} OFFSET ${offset}`,
      [userId, valid_category],
    );

    if (rowCount === 0)
      return {
        success: false,
        message: "No activities found in this category",
      };
    return { success: true, activityRuns: rows };
  }
}

async function fetchActivityRun(id, userId) {
  const { rows, rowCount } = await pool.query(
    "SELECT * FROM activityrun WHERE id = $1 AND user_id = $2",
    [id, userId],
  );

  if (rowCount === 0) return { success: false, message: "Activity not found" };
  return { success: true, activityRuns: rows };
}

async function insertActivityRun(data) {
  const { user_id, name, date, location, duration, category } = data;
  const values = [user_id, name, date, location, duration, category];

  const { rows, rowCount } = await pool.query(
    `INSERT INTO activityrun (user_id, name, date, location, duration, category) 
     VALUES ($1, $2, $3, $4, $5, $6) 
     RETURNING *`,
    values,
  );

  if (rowCount === 0)
    return { success: false, message: "Failed to insert activity" };
  return { success: true, activityRuns: rows };
}

async function updateActivityRun(id, userId, data) {
  const keys = Object.keys(data);
  if (keys.length === 0) return { success: false, message: "Empty data body" };

  const setClause = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");
  const values = Object.values(data);
  values.push(userId, id);

  const query = `
    UPDATE activityrun 
    SET ${setClause} 
    WHERE user_id = $${values.length - 1} AND id = $${values.length} 
    RETURNING *`;

  const { rows, rowCount } = await pool.query(query, values);

  if (rowCount === 0)
    return { success: false, message: "Activity not found or unauthorized" };
  return { success: true, data: rows };
}

async function deleteActivityRun(id, userId) {
  const { rowCount } = await pool.query(
    "DELETE FROM activityrun WHERE id = $1 AND user_id = $2",
    [id, userId],
  );

  if (rowCount === 0) return { success: false, message: "Activity not found" };
  return { success: true, message: "Activity deleted successfully" };
}

module.exports = {
  fetchActivityRuns,
  fetchActivityRun,
  insertActivityRun,
  updateActivityRun,
  deleteActivityRun,
};
