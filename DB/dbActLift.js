const pool = require("./pool.js");
const { NotFoundError, BadRequestError } = require("../Errors/errors.js");
const validQueryGenerator = require("../utils/validQueryGenerator.js");

async function fetchActivityLifts(
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
      "SELECT DISTINCT category FROM activitylift WHERE user_id = $1",
      [userId],
    );
    validCategory = catRows.some((r) => r.category === category)
      ? category
      : "Strength";
  }

  const query = `
    SELECT id, user_id, name, date, location, duration::text AS duration, category 
    FROM activitylift 
    WHERE user_id = $1 
    ${validCategory ? "AND category = $2" : ""}
    ORDER BY ${sortBy} ${order} NULLS LAST 
    LIMIT ${validCategory ? "$3" : "$2"} OFFSET ${validCategory ? "$4" : "$3"}
  `;

  const queryParams = validCategory
    ? [userId, validCategory, limit, offset]
    : [userId, limit, offset];

  const { rows, rowCount } = await pool.query(query, queryParams);
  if (rowCount === 0) {
    throw new NotFoundError("Activity not found");
  }

  return rows;
}

async function fetchActivityLift(id, userId) {
  // const { rows, rowCount } = await pool.query(
  //   "SELECT * FROM activitylift WHERE id = $1 AND user_id = $2",
  //   [id, userId],
  // );
  const { rows, rowCount } = await pool.query(
    `SELECT
      a.name AS exercise_name,
      e.kgs,
      e.reps,
      e.sets,
      o.id
      FROM exerciseexecution e
      JOIN exercises a ON e.exerciseid = a.id
      JOIN activitylift o ON e.activityliftid = o.id
      WHERE o.id = $1 AND o.user_id = $2`,
    [id, userId],
  );
  if (rowCount === 0) {
    throw new NotFoundError("Activity not found");
  }

  return rows;
}

async function insertActivityLift(data) {
  const { user_id, name, date, location, duration, category } = data;

  const query = `
    INSERT INTO activitylift (user_id, name, date, location, duration, category) 
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *; 
  `;

  const values = [user_id, name, date, location, duration, category];

  const { rows, rowCount } = await pool.query(query, values);

  if (rowCount === 0) {
    throw new BadRequestError("Could not create activity");
  }

  return rows[0];
}

async function updateActivityLift(id, userId, data) {
  const ALLOWED_FIELDS = ["name", "date", "location", "duration", "category"];

  const [setClause, values] = validQueryGenerator(
    ALLOWED_FIELDS,
    id,
    data,
    userId,
  );

  const query = `
    UPDATE activitylift
    SET ${setClause}
    WHERE user_id = $${values.length - 1}
      AND id = $${values.length}
    RETURNING *;
  `;

  const { rows, rowCount } = await pool.query(query, values);

  if (rowCount === 0) {
    throw new NotFoundError("Activity not found or unauthorized");
  }

  return rows[0];
}

async function deleteActivityLift(id, userId) {
  const { rowCount } = await pool.query(
    "DELETE FROM activitylift WHERE id = $1 AND user_id = $2",
    [id, userId],
  );

  if (rowCount === 0) {
    throw new NotFoundError("Activity not found or unauthorized");
  }

  return true;
}

module.exports = {
  fetchActivityLifts,
  fetchActivityLift,
  insertActivityLift,
  updateActivityLift,
  deleteActivityLift,
};
