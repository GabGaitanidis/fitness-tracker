const db = require("../DB/dbGoalRun");
const asyncHandler = require("../utils/asyncHandler");

const getRunGoal = asyncHandler(async (req, res) => {
  const runGoals = await db.fetchGoalRun(req.user.id);
  res.status(200).json(runGoals);
});

const createRunGoal = asyncHandler(async (req, res) => {
  req.body.user_id = req.user.id;
  const runGoal = await db.createGoalRun(req.body);
  res.status(201).json(runGoal);
});

const updateRunGoal = asyncHandler(async (req, res) => {
  const runGoal = await db.updateRunGoal(req.user.id, req.params.id, req.body);
  res.status(200).json(runGoal);
});

const deleteRunGoal = asyncHandler(async (req, res) => {
  await db.deleteRunGoal(req.user.id, req.params.id);
  res.status(200).json({ message: "Deleted" });
});

module.exports = {
  getRunGoal,
  createRunGoal,
  updateRunGoal,
  deleteRunGoal,
};
