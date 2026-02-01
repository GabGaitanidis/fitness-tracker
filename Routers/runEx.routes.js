const express = require("express");
const router = express.Router();
const controller = require("../Controllers/runExecutionController");

router.get("/:activityRunId", controller.getRunExecutions);
router.post("/", controller.createRunExecution);
router.patch("/:id", controller.updateRunExecutionInfo);
router.delete("/:id", controller.deleteRunExecution);

module.exports = router;
