const express = require("express");
const router = express.Router();
const controller = require("../Controllers/runExecutionController");
const {
  getRunExecutionsValidation,
  createRunExecutionValidation,
  updateRunExecutionValidation,
  deleteRunExecutionValidation,
} = require("../Validation/runEx.validation");

router.get(
  "/:activityRunId",
  getRunExecutionsValidation,
  controller.getRunExecutions,
);
router.post(
  "/:activityRunId",
  createRunExecutionValidation,
  controller.createRunExecution,
);
router.patch(
  "/:id",
  updateRunExecutionValidation,
  controller.updateRunExecutionInfo,
);
router.delete(
  "/:id",
  deleteRunExecutionValidation,
  controller.deleteRunExecution,
);

module.exports = router;
