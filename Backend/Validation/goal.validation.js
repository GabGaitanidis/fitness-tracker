const { body } = require("express-validator");
const validate = require("../utils/validate");

const createRunGoalValidation = [
  body("user_id")
    .notEmpty()
    .withMessage("user_id cant be empty")
    .isInt()
    .withMessage("user_id must be an integer"),
  body("started")
    .notEmpty()
    .withMessage("started cant be empty")
    .isDate()
    .withMessage("Give a right date"),
  body("due_to").optional().isDate().withMessage("Give a right date"),
  body("km_goal")
    .notEmpty()
    .withMessage("km_goal cant be empty")
    .isFloat({ gt: 0 })
    .withMessage("km_goal must be a positive number"),
  body("name")
    .optional()
    .isString()
    .withMessage("name must be a string")
    .notEmpty()
    .withMessage("name cant be empty"),
  body("notes").optional().isString().withMessage("notes must be a string"),
  validate,
];

const updateRunGoalValidation = [
  body("due_to").optional().isDate().withMessage("Give a right date"),
  body("km_goal")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("km_goal must be a positive number"),
  body("name")
    .optional()
    .isString()
    .withMessage("name must be a string")
    .notEmpty()
    .withMessage("name cant be empty"),
  body("notes").optional().isString().withMessage("notes must be a string"),
  validate,
];

const createLiftGoalValidation = [
  body("user_id")
    .notEmpty()
    .withMessage("user_id cant be empty")
    .isInt()
    .withMessage("user_id must be an integer"),
  body("started")
    .notEmpty()
    .withMessage("started cant be empty")
    .isDate()
    .withMessage("Give a right date"),
  body("due_to").optional().isDate().withMessage("Give a right date"),
  body("kg_goal")
    .notEmpty()
    .withMessage("kg_goal cant be empty")
    .isFloat({ gt: 0 })
    .withMessage("kg_goal must be a positive number"),
  body("exercise_id")
    .notEmpty()
    .withMessage("exercise_id cant be empty")
    .isInt()
    .withMessage("exercise_id must be an integer"),
  body("name")
    .optional()
    .isString()
    .withMessage("name must be a string")
    .notEmpty()
    .withMessage("name cant be empty"),
  body("notes").optional().isString().withMessage("notes must be a string"),
  validate,
];

const updateLiftGoalValidation = [
  body("due_to").optional().isDate().withMessage("Give a right date"),
  body("kg_goal")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("kg_goal must be a positive number"),
  body("exercise_id")
    .optional()
    .isInt()
    .withMessage("exercise_id must be an integer"),
  body("name")
    .optional()
    .isString()
    .withMessage("name must be a string")
    .notEmpty()
    .withMessage("name cant be empty"),
  body("notes").optional().isString().withMessage("notes must be a string"),
  validate,
];

module.exports = {
  createRunGoalValidation,
  updateRunGoalValidation,
  createLiftGoalValidation,
  updateLiftGoalValidation,
};
