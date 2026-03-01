const express = require("express");
const router = express.Router();
const controller = require("../Controllers/goalsLiftController");
const { param } = require("express-validator");
const validate = require("../utils/validate");
const {
  createLiftGoalValidation,
  updateLiftGoalValidation,
} = require("../Validation/goal.validation");

router.get("/", controller.getLiftGoal);
router.post("/", createLiftGoalValidation, controller.createLiftGoal);
router.patch(
  "/:id",
  [
    param("id").isInt().withMessage("id must be an integer"),
    validate,
    updateLiftGoalValidation,
  ],
  controller.updateLiftGoal,
);
router.delete(
  "/:id",
  [param("id").isInt().withMessage("id must be an integer"), validate],
  controller.deleteLiftGoal,
);

module.exports = router;
