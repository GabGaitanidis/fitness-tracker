const db = require("../DB/dbActRun.js");

async function getActivityRuns(req, res) {
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
    const activityRuns = await db.fetchActivityRuns(
      userId,
      page,
      sortBy,
      order,
      category,
    );
    if (!activityRuns.success) {
      return res.status(404).json({
        message: "Activity not found or you don't have permission for it.",
      });
    }
    res.status(200).json(activityRuns);
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}

async function getActivityRun(req, res) {
  const userId = req.user.id;
  const id = req.params.id;
  try {
    const activityRun = await db.fetchActivityRun(id, userId);
    if (!activityRun.success) {
      return res.status(404).json({
        message: "Activity not found or you don't have permission for it.",
      });
    }
    res.status(200).json(activityRun);
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}

async function createActivityRun(req, res) {
  req.body.user_id = req.user.id;
  try {
    const activityRun = await db.insertActivityRun(req.body);
    if (!activityRun.success) {
      return res.status(404).json({
        message: "Activity not found or you don't have permission for it.",
      });
    }
    res.status(201).json(activityRun);
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}
async function updateActivityRun(req, res) {
  const userId = req.user.id;
  const id = req.params.id;
  try {
    const activityRun = await db.updateActivityRun(id, userId, req.body);
    if (!activityRun.success) {
      return res.status(404).json({
        message: "Activity not found or you don't have permission for it.",
      });
    }
    res.status(200).json(activityRun);
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}
async function deleteActivityRun(req, res) {
  const userId = req.user.id;
  const activityId = req.params.id;

  try {
    const result = await db.deleteActivityRun(activityId, userId);

    if (!result.success) {
      return res.status(404).json({
        message:
          "Activity not found or you don't have permission to delete it.",
      });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}
module.exports = {
  getActivityRuns,
  getActivityRun,
  createActivityRun,
  updateActivityRun,
  deleteActivityRun,
};
