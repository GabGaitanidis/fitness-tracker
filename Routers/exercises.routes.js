const express = require("express");
const router = express.Router();
const controller = require("../Controllers/exerciseController");
const validation = require("../Validation/exercise.validation");
router.get("/", controller.getExercises);
router.post("/", validation.exerciseBodyValidation, controller.createExercise);
router.patch("/:id", controller.updateExercise);
router.delete("/:id", controller.deleteExercise);

module.exports = router;
