const express = require("express");
const router = express.Router();
const controller = require("../Controllers/exerciseExecutionController");
const {
  getExecutionsValidation,
  createExecutionValidation,
  updateExecutionValidation,
  deleteExecutionValidation,
} = require("../Validation/liftEx.validation");

// Exercises Router
router.get(
  "/:activityLiftId",
  getExecutionsValidation,
  controller.getExerciseExecutions,
);
router.post(
  "/:activityLiftId",
  createExecutionValidation,
  controller.createExerciseExecution,
);
router.patch(
  "/:id",
  updateExecutionValidation,
  controller.updateExerciseExecutionInfo,
);
router.delete(
  "/:id",
  deleteExecutionValidation,
  controller.deleteExerciseExecution,
);
module.exports = router;
