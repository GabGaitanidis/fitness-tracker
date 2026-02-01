const express = require("express");
const router = express.Router();
const controller = require("../Controllers/goalsRunController");

router.get("/", controller.getRunGoal);
router.post("/", controller.createRunGoal);
router.patch("/:id", controller.updateRunGoal);
router.delete("/:id", controller.deleteRunGoal);

module.exports = router;
