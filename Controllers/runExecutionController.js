const db = require("../DB/dbRunExecution.js");
const asyncHandler = require("../utils/asyncHandler.js");

const getRunExecutions = asyncHandler(async (req, res) => {
  const activityRunId = req.params.activityRunId;
  const runExecutions = await db.fetchRunExecutions(activityRunId);

  res.status(200).json(runExecutions);
});

const createRunExecution = asyncHandler(async (req, res) => {
  req.body.activityrunid = req.params.activityRunId;

  const runExecution = await db.insertRunExecution(req.body);

  res.status(201).json(runExecution);
});

const updateRunExecutionInfo = asyncHandler(async (req, res) => {
  const runExecution = await db.updateRunExecution(req.params.id, req.body);
  res.status(200).json(runExecution);
});

const deleteRunExecution = asyncHandler(async (req, res) => {
  await db.removeRunExecution(req.params.id);

  res.status(200).json({ message: "Deleted successfully" });
});

module.exports = {
  getRunExecutions,
  createRunExecution,
  updateRunExecutionInfo,
  deleteRunExecution,
};
