const express = require("express");
const router = express.Router();
const coontroller = require("../Controllers/activityLiftController.js");
// activityLift Route
router.get("/", coontroller.getActivityLifts);
router.get("/:id", coontroller.getActivityLift);
router.post("/", coontroller.createActivityLift);
router.patch("/:id", coontroller.updateActivityLift);
router.delete("/:id", coontroller.deleteActivityLift);
module.exports = router;
