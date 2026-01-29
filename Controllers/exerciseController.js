const db = require("../DB/dbExercises");

async function getExercises(req, res) {
  try {
    const exercises = await db.fetchExercises(req.user.id);
    if (!exercises.success) {
      return res.status(404).json({ message: "Exercises not found" });
    }
    res.status(200).json(exercises);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}
