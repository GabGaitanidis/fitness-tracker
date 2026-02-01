const express = require("express");
const router = express.Router();
const controller = require("../Controllers/goalsLiftController");

router.get("/", controller.getLiftGoal);
router.post("/", controller.createLiftGoal);
router.patch("/:id", controller.updateLiftGoal);
router.delete("/:id", controller.deleteLiftGoal);

module.exports = router;
