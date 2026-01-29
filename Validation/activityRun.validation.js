const { body, param, query, validationResult } = require("express-validator");
const validate = (req, res, next) => {
  const errors = validationResult(req);
  console.log("val");
  if (errors.isEmpty()) {
    console.log("empty");
    return next();
  }
  return res.status(422).json({ errors: errors.array() });
};
const activityRunBodyValidation = [
  body("name").notEmpty().withMessage("name cant be empty"),
  body("date").notEmpty().withMessage("Give a right Date!"),
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
