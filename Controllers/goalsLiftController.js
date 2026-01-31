const db = require("../DB/dbGoalLift");
const asyncHandler = require("../utils/asyncHandler");

const getLiftGoal = asyncHandler(async (req, res) => {
  const liftGoals = await db.fetchGoalLift(req.user.id);
  res.status(200).json(liftGoals);
});

const createLiftGoal = asyncHandler(async (req, res) => {
  req.body.user_id = req.user.id;
  const liftGoal = await db.createGoalLift(req.body);
  res.status(201).json(liftGoal);
});

const updateLiftGoal = asyncHandler(async (req, res) => {
  const liftGoal = await db.updateLiftGoal(
    req.user.id,
    req.params.id,
    req.body,
  );
  res.status(200).json(liftGoal);
});

const deleteLiftGoal = asyncHandler(async (req, res) => {
  await db.deleteLiftGoal(req.user.id, req.params.id);
  res.status(200).json({ message: "Deleted" });
});

module.exports = {
  getLiftGoal,
  createLiftGoal,
  updateLiftGoal,
  deleteLiftGoal,
};
