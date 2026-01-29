const express = require("express");
const router = express.Router();
// goalsLift Router
router.get("/");
router.get("/user/:id");
router.get("/:id");
router.post("/");
router.put("/:id");
router.delete("/:id");

module.exports = router;
