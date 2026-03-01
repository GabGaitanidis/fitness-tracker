const express = require("express");
const router = express.Router();
const controller = require("../Controllers/goalsRunController");
const { param } = require("express-validator");
const validate = require("../utils/validate");
const {
  createRunGoalValidation,
  updateRunGoalValidation,
} = require("../Validation/goal.validation");

router.get("/", controller.getRunGoal);
router.post("/", createRunGoalValidation, controller.createRunGoal);
router.patch(
  "/:id",
  [
    param("id").isInt().withMessage("id must be an integer"),
    validate,
    updateRunGoalValidation,
  ],
  controller.updateRunGoal,
);
router.delete(
  "/:id",
  [param("id").isInt().withMessage("id must be an integer"), validate],
  controller.deleteRunGoal,
);

module.exports = router;
