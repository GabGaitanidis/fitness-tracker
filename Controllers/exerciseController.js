const db = require("../DB/dbExercises");
const asyncHandler = require("../utils/asyncHandler");
const checkUserId = require("../utils/checkUserId");

const getExercises = asyncHandler(async (req, res) => {
  checkUserId(req.user.id);
  const userId = req.user.id;
  const exercises = await db.fetchExercises(userId);
  res.status(200).json(exercises);
});

const createExercise = asyncHandler(async (req, res) => {
  const exercise = await db.insertExercise(req.user.id, req.body);
  res.status(201).json(exercise);
});

const updateExercise = asyncHandler(async (req, res) => {
  const exercise = await db.updateExercise(
    req.user.id,
    req.params.id,
    req.body,
  );
  res.status(200).json(exercise);
});

const deleteExercise = asyncHandler(async (req, res) => {
  await db.removeExercise(req.user.id, req.params.id);
  res.status(200).json({ message: "Exercise deleted" });
});

module.exports = {
  getExercises,
  createExercise,
  updateExercise,
  deleteExercise,
};
