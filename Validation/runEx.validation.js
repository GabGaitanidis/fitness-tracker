const { body, param } = require("express-validator");
const validate = require("../utils/validate");

const getRunExecutionsValidation = [
  param("activityRunId")
    .isInt()
    .withMessage("activityRunId must be an integer"),
  validate,
];

const createRunExecutionValidation = [
  param("activityRunId")
    .isInt()
    .withMessage("activityRunId must be an integer"),
  body("km")
    .notEmpty()
    .withMessage("km cant be empty")
    .isFloat({ gt: 0 })
    .withMessage("km must be a positive number"),
  body("duration")
    .notEmpty()
    .withMessage("duration cant be empty")
    .isString()
    .withMessage("duration must be a string"),
  validate,
];

const updateRunExecutionValidation = [
  param("id").isInt().withMessage("id must be an integer"),
  body("km")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("km must be a positive number"),
  body("duration")
    .optional()
    .isString()
    .withMessage("duration must be a string"),
  validate,
];

const deleteRunExecutionValidation = [
  param("id").isInt().withMessage("id must be an integer"),
  validate,
];

module.exports = {
  getRunExecutionsValidation,
  createRunExecutionValidation,
  updateRunExecutionValidation,
  deleteRunExecutionValidation,
};
