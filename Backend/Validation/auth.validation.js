const { body } = require("express-validator");

function loginValidation() {
  return [
    body("username").exists().withMessage("username is required").isString(),
    body("password").exists().withMessage("password is required").isString(),
  ];
}

module.exports = { loginValidation };
