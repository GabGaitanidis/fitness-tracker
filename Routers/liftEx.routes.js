const express = require("express");
const router = express.Router();
const controller = require("../Controllers/exerciseExecutionController");
// Exercises Router
router.get("/:activityLiftId", controller.getExerciseExecutions);
router.post("/:activityLiftId", controller.createExerciseExecution);
router.patch("/:id", controller.updateExerciseExecutionInfo);
router.delete("/:id", controller.deleteExerciseExecution);
module.exports = router;
