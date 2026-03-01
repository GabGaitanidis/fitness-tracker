const { body, param, query, validationResult } = require("express-validator");

const validate = require("../utils/validate");

const idValidation = () => {
  return [
    param("id").trim().isInt().withMessage("Id must be integer"),
    validate,
  ];
};

const formUserValidation = () => {
  return [
    body("username")
      .trim()
      .isAlpha()
      .isLength({ min: 3 })
      .withMessage("Username must be longer than 2 characters"),
    body("email").trim().isEmail().withMessage("Provide a valid email!"),
    body("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Password must contain 8 or more characters!"),
    validate,
  ];
};

const bodyFormValidation = () => {
  return [
    body("age").optional().isInt().withMessage("Age must be integer!"),
    body("height").optional().isFloat(),
    body("weight").optional().isFloat(),
    body("city").optional().isAlpha(),
    validate,
  ];
};

module.exports = {
  validate,
  idValidation,
  formUserValidation,
  bodyFormValidation,
};
