const express = require("express");
const router = express.Router();
const ctrl = require("../Controllers/runExecutionController");

router.get("/:activityRunId", ctrl.getRunExecutions);
router.post("/", ctrl.createRunExecution);
router.patch("/:id", ctrl.patchRunExecution);
router.delete("/:id", ctrl.deleteRunExecution);

module.exports = router;
