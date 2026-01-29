const asyncHandler = require("../middleware/asyncHandler");

const getExercises = asyncHandler(async (req, res) => {
  const exercises = await db.fetchExercises(req.user.id);
  res.status(200).json(exercises);
});

module.exports = { getExercises };
