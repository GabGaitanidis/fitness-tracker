const pool = require("./pool.js");
const { NotFoundError, BadRequestError } = require("../Errors/errors.js");
const validQueryGenerator = require("../utils/validQueryGenerator.js");

async function fetchActivityRuns(
  userId,
  page,
  sortBy,
  order,
  category = undefined,
) {
  const limit = 3;
  const offset = (page - 1) * limit;

  let validCategory = category;
  if (category) {
    const { rows: catRows } = await pool.query(
      "SELECT DISTINCT category FROM activityrun WHERE user_id = $1",
      [userId],
    );
    validCategory = catRows.some((r) => r.category === category)
      ? category
      : "Walking";
  }

  const query = `
    SELECT id, user_id, name, date, location, duration::text AS duration, category 
    FROM activityrun 
    WHERE user_id = $1 
    ${validCategory ? "AND category = $2" : ""}
    ORDER BY ${sortBy} ${order} NULLS LAST 
    LIMIT ${validCategory ? "$3" : "$2"} OFFSET ${validCategory ? "$4" : "$3"}
  `;

  const queryParams = validCategory
    ? [userId, validCategory, limit, offset]
    : [userId, limit, offset];

  const { rows } = await pool.query(query, queryParams);

  return rows;
}

async function fetchActivityRun(id, userId) {
  const { rows, rowCount } = await pool.query(
    "SELECT * FROM activityrun WHERE id = $1 AND user_id = $2",
    [id, userId],
  );

  if (rowCount === 0) throw new NotFoundError("Activity not found");

  return rows[0];
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

  if (rowCount === 0) throw new BadRequestError("Failed to insert activity");

  return rows[0];
}

async function updateActivityRun(id, userId, data) {
  const ALLOWED_FIELDS = ["name", "date", "location", "duration", "category"];

  const [setClause, values] = validQueryGenerator(
    ALLOWED_FIELDS,
    id,
    data,
    userId,
  );

  const query = `
    UPDATE activityrun 
    SET ${setClause} 
    WHERE user_id = $${values.length - 1} AND id = $${values.length} 
    RETURNING *`;

  const { rows, rowCount } = await pool.query(query, values);

  if (rowCount === 0)
    throw new NotFoundError("Activity not found or unauthorized");

  return rows[0];
}

async function deleteActivityRun(id, userId) {
  const { rowCount } = await pool.query(
    "DELETE FROM activityrun WHERE id = $1 AND user_id = $2",
    [id, userId],
  );

  if (rowCount === 0) throw new NotFoundError("Activity not found");

  return true;
}

module.exports = {
  fetchActivityRuns,
  fetchActivityRun,
  insertActivityRun,
  updateActivityRun,
  deleteActivityRun,
};
