const express = require("express");
const router = express.Router();
const controller = require("../Controllers/activityLiftController.js");
const activityLiftValidation = require("../Validation/activity.validation.js");

// activityLift Route
router.get("/", controller.getActivityLifts);
router.get("/:id", controller.getActivityLift);
router.post(
  "/",
  activityLiftValidation.activityRunBodyValidation,
  controller.createActivityLift,
);
router.patch(
  "/:id",
  activityLiftValidation.activityrunBodyValidationUpdate,
  controller.updateActivityLift,
);
router.delete("/:id", controller.deleteActivityLift);
module.exports = router;
