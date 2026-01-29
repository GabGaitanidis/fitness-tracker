const db = require("../DB/dbActLift.js");
const asyncHandler = require("../utils/asyncHandler");
const { NotFoundError, UnauthorizedError } = require("../Errors/errors.js");

const getActivityLifts = asyncHandler(async (req, res) => {
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

  const activityLifts = await db.fetchActivityLifts(
    userId,
    page,
    sortBy,
    order,
    category,
  );

  if (!activityLifts.success) {
    throw new NotFoundError(
      "Activity not found or you don't have permission for it.",
    );
  }

  res.status(200).json(activityLifts);
});

const getActivityLift = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;

  const activityLift = await db.fetchActivityLift(id, userId);
  if (!activityLift.success) {
    throw new NotFoundError(
      "Activity not found or you don't have permission for it.",
    );
  }

  res.status(200).json(activityLift);
});

const createActivityLift = asyncHandler(async (req, res) => {
  req.body.user_id = req.user.id;

  const activityLift = await db.insertActivityLift(req.body);
  if (!activityLift.success) {
    throw new NotFoundError(
      "Activity not found or you don't have permission for it.",
    );
  }

  res.status(201).json(activityLift);
});

const updateActivityLift = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;

  const activityLift = await db.updateActivityLift(id, userId, req.body);
  if (!activityLift.success) {
    throw new NotFoundError(
      "Activity not found or you don't have permission for it.",
    );
  }

  res.status(200).json(activityLift);
});

const deleteActivityLift = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const activityId = req.params.id;

  const result = await db.deleteActivityLift(activityId, userId);
  if (!result.success) {
    throw new NotFoundError(
      "Activity not found or you don't have permission to delete it.",
    );
  }

  res.status(200).json({ message: "Deleted successfully" });
});

module.exports = {
  getActivityLifts,
  getActivityLift,
  createActivityLift,
  updateActivityLift,
  deleteActivityLift,
};
