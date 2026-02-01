const db = require("../DB/dbActLift.js");
const asyncHandler = require("../utils/asyncHandler");
const { NotFoundError, UnauthorizedError } = require("../Errors/errors.js");
const checkUserId = require("../utils/checkUserId.js");

const getActivityLifts = asyncHandler(async (req, res) => {
  checkUserId(req.user.id);
  const userId = req.user.id;
  const sortByFields = ["name", "duration", "date"];
  const page = parseInt(req.query.page) || 1;
  const sortBy = sortByFields.includes(req.query.sort)
    ? req.query.sort
    : "date";
  const order = req.query.order?.toUpperCase() === "DESC" ? "DESC" : "ASC";
  const category = req.query.category;

  const activityLifts = await db.fetchActivityLifts(
    userId,
    page,
    sortBy,
    order,
    category,
  );

  res.status(200).json(activityLifts);
});

const getActivityLift = asyncHandler(async (req, res) => {
  checkUserId(req.user.id);

  const userId = req.user.id;
  const id = req.params.id;

  const activityLift = await db.fetchActivityLift(id, userId);

  res.status(200).json(activityLift);
});

const createActivityLift = asyncHandler(async (req, res) => {
  checkUserId(req.user.id);

  req.body.user_id = req.user.id;

  const activityLift = await db.insertActivityLift(req.body);

  res.status(201).json(activityLift);
});

const updateActivityLift = asyncHandler(async (req, res) => {
  checkUserId(req.user.id);

  const userId = req.user.id;
  const id = req.params.id;

  const activityLift = await db.updateActivityLift(id, userId, req.body);

  res.status(200).json(activityLift);
});

const deleteActivityLift = asyncHandler(async (req, res) => {
  checkUserId(req.user.id);

  const userId = req.user.id;
  const activityId = req.params.id;

  await db.deleteActivityLift(activityId, userId);

  res.status(200).json({ message: "Deleted successfully" });
});

module.exports = {
  getActivityLifts,
  getActivityLift,
  createActivityLift,
  updateActivityLift,
  deleteActivityLift,
};
