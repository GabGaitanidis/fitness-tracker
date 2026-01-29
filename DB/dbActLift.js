const pool = require("./pool.js");

async function fetchActivityLifts(
  userId,
  page,
  sortBy,
  order,
  category = undefined,
) {
  const limit = 3;
  const offset = (page - 1) * limit;

  if (!category) {
    const activityLift = await pool.query(
      `SELECT id, user_id, name, date, location, duration::text AS duration, category 
     FROM activitylift 
     WHERE user_id = $1 
     ORDER BY ${sortBy} ${order} NULLS LAST 
     LIMIT ${limit} OFFSET ${offset}`,
      [userId],
    );
    if (activityLift.rowCount === 0) {
      return {
        success: false,
        message: "Activities not found or unauthorized",
      };
    }
    return { success: true, activityLifts: activityLift.rows };
  } else {
    const categories = await pool.query(
      "SELECT DISTINCT category FROM activitylift WHERE user_id = $1",
      [userId],
    );
    const valid_category = categories.rows.some((r) => r.category === category)
      ? category
      : "Strength";

    const activityLift = await pool.query(
      `SELECT id, user_id, name, date, location, duration::text AS duration, category 
     FROM activitylift 
     WHERE user_id = $1 
     AND category = $2
     ORDER BY ${sortBy} ${order} NULLS LAST 
     LIMIT ${limit} OFFSET ${offset}`,
      [userId, valid_category],
    );
    if (activityLift.rowCount === 0) {
      return {
        success: false,
        message: "Activities not found",
      };
    }
    return { success: true, activityLifts: activityLift.rows };
  }
}

async function fetchActivityLift(id, userId) {
  const activityLift = await pool.query(
    "SELECT * FROM activitylift WHERE id = $1 AND user_id = $2",
    [id, userId],
  );
  if (activityLift.rowCount === 0) {
    return {
      success: false,
      message: "Activity not found",
    };
  }
  return { success: true, activityLift: activityLift.rows[0] };
}

async function insertActivityLift(data) {
  const { user_id, name, date, location, duration, category } = data;

  const query = `
    INSERT INTO activitylift (user_id, name, date, location, duration, category) 
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *; 
  `;

  const values = [user_id, name, date, location, duration, category];

  const activityLift = await pool.query(query, values);
  if (activityLift.rowCount === 0) {
    return {
      success: false,
      message: "Could not create activity",
    };
  }
  return { success: true, activityLift: activityLift.rows[0] };
}

async function updateActivityLift(id, userId, data) {
  const entries = Object.entries(data);
  const dataPromises = entries.map(([column, value]) => {
    return pool.query(
      `UPDATE activitylift SET ${column} = $1 WHERE user_id = $2 and id = $3`,
      [value, userId, id],
    );
  });

  await Promise.all(dataPromises);

  const activityLift = await pool.query(
    "SELECT * FROM activitylift WHERE id = $1",
    [id],
  );

  if (activityLift.rowCount === 0) {
    return {
      success: false,
      message: "Activity not found",
    };
  }
  return { success: true, activityLift: activityLift.rows[0] };
}

async function deleteActivityLift(id, userId) {
  const result = await pool.query(
    "DELETE FROM activitylift WHERE id = $1 AND user_id = $2",
    [id, userId],
  );

  if (result.rowCount === 0) {
    return {
      success: false,
      message: "Activity not found or unauthorized",
    };
  }

  return { success: true };
}

module.exports = {
  fetchActivityLifts,
  fetchActivityLift,
  insertActivityLift,
  updateActivityLift,
  deleteActivityLift,
};
