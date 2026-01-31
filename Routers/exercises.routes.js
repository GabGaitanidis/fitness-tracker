const express = require("express");
const router = express.Router();
const controller = require("../Controllers/exerciseController");

router.get("/", controller.getExercises);
router.post("/", controller.createExercise);
router.patch("/:id", controller.updateExercise);
router.delete("/:id", controller.deleteExercise);

module.exports = router;
