const express = require("express");
const router = express.Router();
const login = require("../Auth/login.js");
const logout = require("../Auth/logout.js");
const { loginValidation } = require("../Validation/auth.validation.js");
const validate = require("../utils/validate.js");
router.post("/logout", logout);

router.post("/login", loginValidation(), validate, login);
module.exports = router;
