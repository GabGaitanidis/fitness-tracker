const express = require("express");
const router = express.Router();
const login = require("../Auth/login.js");
const logout = require("../Auth/logout.js");
router.post("/logout", logout);

router.post("/login", login);
module.exports = router;
