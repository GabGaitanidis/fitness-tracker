const { body, param } = require("express-validator");
const validate = require("../utils/validate");

const getExecutionsValidation = [
  param("activityLiftId")
    .isInt()
    .withMessage("activityLiftId must be an integer"),
  validate,
];

const createExecutionValidation = [
  param("activityLiftId")
    .isInt()
    .withMessage("activityLiftId must be an integer"),
  body("exerciseid")
    .notEmpty()
    .withMessage("exerciseid cant be empty")
    .isInt()
    .withMessage("exerciseid must be an integer"),
  body("kgs")
    .notEmpty()
    .withMessage("kgs cant be empty")
    .isFloat({ gt: 0 })
    .withMessage("kgs must be a positive number"),
  body("reps")
    .notEmpty()
    .withMessage("reps cant be empty")
    .isInt({ gt: 0 })
    .withMessage("reps must be a positive integer"),
  body("sets")
    .notEmpty()
    .withMessage("sets cant be empty")
    .isInt({ gt: 0 })
    .withMessage("sets must be a positive integer"),
  validate,
];

const updateExecutionValidation = [
  param("id").isInt().withMessage("id must be an integer"),
  body("kgs")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("kgs must be a positive number"),
  body("reps")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("reps must be a positive integer"),
  body("sets")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("sets must be a positive integer"),
  validate,
];

const deleteExecutionValidation = [
  param("id").isInt().withMessage("id must be an integer"),
  validate,
];

module.exports = {
  getExecutionsValidation,
  createExecutionValidation,
  updateExecutionValidation,
  deleteExecutionValidation,
};
