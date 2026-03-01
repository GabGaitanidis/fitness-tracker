const express = require("express");
const authToken = require("../Auth/authToken.js");
const activityRunValidation = require("../Validation/activity.validation.js");
const controller = require("../Controllers/activityRunController.js");
const router = express.Router();
// activityRun Router
router.get("/", controller.getActivityRuns);
router.get("/:id", controller.getActivityRun);

router.post(
  "/",
  activityRunValidation.activityRunBodyValidation,
  controller.createActivityRun,
);
router.patch(
  "/:id",
  activityRunValidation.activityrunBodyValidationUpdate,
  controller.updateActivityRun,
);
router.delete("/:id", controller.deleteActivityRun);
module.exports = router;
