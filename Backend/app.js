// load environment variables from .env file if present
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const app = express();
const authToken = require("./Auth/authToken.js");
const cookieParser = require("cookie-parser");
const userRouter = require("./Routers/user.routes.js");
const loginRouter = require("./Routers/auth.routes.js");
const runExRouter = require("./Routers/runEx.routes.js");
const liftExRouter = require("./Routers/liftEx.routes.js");
const goalsRunRouter = require("./Routers/goalsRun.routes.js");
const goalsLiftRouter = require("./Routers/goalsLift.routes.js");
const exercisesRouter = require("./Routers/exercises.routes.js");
const actRunRouter = require("./Routers/actRun.routes.js");
const actLiftRouter = require("./Routers/actLift.routes.js");
// logging
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/auth", loginRouter);

app.use(authToken);
app.use("/users", userRouter);
app.use("/run-execution", runExRouter);
app.use("/lift-execution", liftExRouter);
app.use("/run-goals", goalsRunRouter);
app.use("/lift-goals", goalsLiftRouter);
app.use("/exercises", exercisesRouter);
app.use("/activity-run", actRunRouter);
app.use("/activity-lift", actLiftRouter);

// configuration -- use environment variables where possible
const PORT = process.env.PORT || 3000;

// basic security middlewares
app.use(cors());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

// central error handler
app.use((err, req, res, next) => {
  // if the error is an AppError we already have a status code
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  // log the error for debugging (could be replaced with winston, etc.)
  console.error(err);
  res.status(status).json({ error: message });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
