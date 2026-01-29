const db = require("../DB/dbActLift.js");

async function getActivityLifts(req, res) {
  const userId = req.user.id;
  if (!userId) {
    return res.status(404).json({ message: "User not found!" });
  }
  try {
    const sortByFields = ["name", "duration", "date"];
    const page = parseInt(req.query.page) || 1;
    const sortBy = sortByFields.includes(req.query.sort)
      ? req.query.sort
      : "date";
    const order = req.query.order?.toUpperCase() == "DESC" ? "DESC" : "ASC";
    const category = req.query.category;

    // Using Lift specific DB method
    const activityLifts = await db.fetchActivityLifts(
      userId,
      page,
      sortBy,
      order,
      category,
    );

    if (!activityLifts.success) {
      return res.status(404).json({
        message: "Activity not found or you don't have permission for it.",
      });
    }
    res.status(200).json(activityLifts);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}

async function getActivityLift(req, res) {
  const userId = req.user.id;
  const id = req.params.id;
  try {
    const activityLift = await db.fetchActivityLift(id, userId);
    if (!activityLift.success) {
      return res.status(404).json({
        message: "Activity not found or you don't have permission for it.",
      });
    }
    res.status(200).json(activityLift);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}

async function createActivityLift(req, res) {
  req.body.user_id = req.user.id;
  try {
    const activityLift = await db.insertActivityLift(req.body);
    if (!activityLift.success) {
      return res.status(404).json({
        message: "Activity not found or you don't have permission for it.",
      });
    }
    res.status(201).json(activityLift);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}

async function updateActivityLift(req, res) {
  const userId = req.user.id;
  const id = req.params.id;
  try {
    const activityLift = await db.updateActivityLift(id, userId, req.body);
    if (!activityLift.success) {
      return res.status(404).json({
        message: "Activity not found or you don't have permission for it.",
      });
    }
    res.status(200).json(activityLift);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}

async function deleteActivityLift(req, res) {
  const userId = req.user.id;
  const activityId = req.params.id;

  try {
    const result = await db.deleteActivityLift(activityId, userId);

    if (!result.success) {
      return res.status(404).json({
        message:
          "Activity not found or you don't have permission to delete it.",
      });
    }

    res.status(200).json({ msg: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}

module.exports = {
  getActivityLifts,
  getActivityLift,
  createActivityLift,
  updateActivityLift,
  deleteActivityLift,
};
