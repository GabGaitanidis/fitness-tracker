const db = require("../DB/dbExerciseEx.js");
const asyncHandler = require("../utils/asyncHandler");

const getExerciseExecutions = asyncHandler(async (req, res) => {
  const activityLiftId = req.params.activityLiftId;
  const exerciseExecutions = await db.fetchExerciseExecutions(activityLiftId);

  res.status(200).json(exerciseExecutions);
});

const createExerciseExecution = asyncHandler(async (req, res) => {
  req.body.activityliftid = req.params.activityLiftId;
  const exerciseExecution = await db.insertExerciseExecutions(req.body);

  res.status(201).json(exerciseExecution);
});

const updateExerciseExecutionInfo = asyncHandler(async (req, res) => {
  const exerciseExecution = await db.updateExerciseExecution(
    req.params.id,
    req.body,
  );
  res.status(200).json(exerciseExecution);
});

const deleteExerciseExecution = asyncHandler(async (req, res) => {
  await db.removeExerciseExecution(req.params.id);

  res.status(200).json({ message: "Deleted successfully" });
});

module.exports = {
  getExerciseExecutions,
  createExerciseExecution,
  updateExerciseExecutionInfo,
  deleteExerciseExecution,
};
