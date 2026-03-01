const { body, param, query } = require("express-validator");
const validate = require("../utils/validate");
const activityRunBodyValidation = [
  body("name").notEmpty().withMessage("name cant be empty"),
  body("date").notEmpty().withMessage("Date cant be empty"),
  body("date").isDate().withMessage("Give a right date"),
  body("location").notEmpty().withMessage("location cant be empty"),
  body("duration").notEmpty().withMessage("duration cant be empty"),
  body("category").notEmpty().withMessage("category cant be empty"),
  validate,
];

const activityrunBodyValidationUpdate = [
  body("name")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Name cannot be empty!"),
  body("duration")
    .optional()
    .matches(/^([0-9]{1,2}):([0-5][0-9])(:[0-5][0-9])?$/)
    .withMessage("Duration must be in HH:MM:SS or HH:MM format"),
  body("category")
    .optional()
    .notEmpty()
    .withMessage("Category cannot be empty!"),
  body("location")
    .optional()
    .notEmpty()
    .withMessage("Location cannot be empty!"),
  validate,
];
module.exports = { activityRunBodyValidation, activityrunBodyValidationUpdate };
