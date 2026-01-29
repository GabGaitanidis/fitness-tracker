const express = require("express");
const app = express();
const authToken = require("./Auth/authToken.js");
const cookieParser = require("cookie-parser");
const userRouter = require("./Routers/user.routes.js");
const loginRouter = require("./Routers/auth.routes.js");
// const runExRouter = require("./Routers/runEx.routes.js");
const liftExRouter = require("./Routers/liftEx.routes.js");
// const goalsRunRouter = require("./Routers/goalsRun.routes.js");
// const goalsLiftRouter = require("./Routers/goalsLift.routes.js");
// const exercisesRouter = require("./Routers/exercises.routes.js");
const actRunRouter = require("./Routers/actRun.routes.js");
const actLiftRouter = require("./Routers/actLift.routes.js");
// const actLiftRouter = require("./Routers/actLift.routes.js");
app.use(express.json());
app.use(cookieParser());
app.use("/auth", loginRouter);

app.use(authToken);
app.use("/users", userRouter);
// app.use("/run-execution", runExRouter);
// app.use("/lift-execution", liftExRouter);
// app.use("/run-goals", goalsRunRouter);
// app.use("/lift-goals", goalsLiftRouter);
app.use("/liftex", liftExRouter);
app.use("/activity-run", actRunRouter);
app.use("/activity-lift", actLiftRouter);

app.listen(3000);
