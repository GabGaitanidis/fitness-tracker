const db = require("../DB/dbExerciseEx.js");

async function getExerciseExecutions(req, res) {
  const activityLiftId = req.params.activityLiftId;
  try {
    const exerciseExecutions = await db.fetchExerciseExecutions(activityLiftId);
    if (!exerciseExecutions.success) {
      return res.status(404).json({
        message: "Exercises not found or you don't have permission for it.",
      });
    }
    res.status(200).json(exerciseExecutions);
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}

async function createExerciseExecution(req, res) {
  req.body.activityliftid = req.params.activityLiftId;
  try {
    const exerciseExecution = await db.insertExerciseExecutions(req.body);
    if (!exerciseExecution.success) {
      return res.status(404).json({
        message: "Exercises not found or you don't have permission for it.",
      });
    }
    res.status(201).json(exerciseExecution);
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}

async function updateExerciseExecutionInfo(req, res) {
  try {
    const exerciseExecution = await db.updateExerciseExecution(
      req.params.id,
      req.body,
    );
    if (!exerciseExecution.success) {
      return res.status(404).json({
        message: "Exercise not found or you don't have permission for it.",
      });
    }
    res.status(200).json(exerciseExecution);
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}

async function deleteExerciseExecution(req, res) {
  try {
    const exerciseExecution = await db.removeExerciseExecution(req.params.id);
    if (!exerciseExecution.success) {
      return res.status(404).json({
        message: "Exercise not found or you don't have permission for it.",
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
  getExerciseExecutions,
  createExerciseExecution,
  updateExerciseExecutionInfo,
  deleteExerciseExecution,
};
