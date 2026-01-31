const db = require("../DB/dbActRun.js");
const asyncHandler = require("../utils/asyncHandler");
const { NotFoundError, UnauthorizedError } = require("../Errors/errors.js");

const getActivityRuns = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new UnauthorizedError("User not found!");
  }

  const sortByFields = ["name", "duration", "date"];
  const page = parseInt(req.query.page) || 1;
  const sortBy = sortByFields.includes(req.query.sort)
    ? req.query.sort
    : "date";
  const order = req.query.order?.toUpperCase() === "DESC" ? "DESC" : "ASC";
  const category = req.query.category;

  const activityRuns = await db.fetchActivityRuns(
    userId,
    page,
    sortBy,
    order,
    category,
  );

  if (!activityRuns.success) {
    throw new NotFoundError(
      "Activity not found or you don't have permission for it.",
    );
  }

  res.status(200).json(activityRuns);
});

const getActivityRun = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;

  const activityRun = await db.fetchActivityRun(id, userId);

  res.status(200).json(activityRun);
});

const createActivityRun = asyncHandler(async (req, res) => {
  req.body.user_id = req.user.id;

  const activityRun = await db.insertActivityRun(req.body);

  res.status(201).json(activityRun);
});

const updateActivityRun = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;

  const activityRun = await db.updateActivityRun(id, userId, req.body);

  res.status(200).json(activityRun);
});

const deleteActivityRun = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const activityId = req.params.id;

  await db.deleteActivityRun(activityId, userId);

  res.status(200).json({ message: "Deleted successfully" });
});

module.exports = {
  getActivityRuns,
  getActivityRun,
  createActivityRun,
  updateActivityRun,
  deleteActivityRun,
};
