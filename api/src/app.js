const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const authRouter = require("../src/authentication/routers/auth.router");
const userRouter = require("../src/user/routes/userRouter");
const eventRouter = require("../src/event/routers/event.router");
const commandRouter = require("../src/command/router/led.command.router")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/commands",commandRouter);

app.post("/api/v1/hello", (req, res) => {
  console.log(req.body);
  res.send('Received "Hello World" message');
});

app.use((error, req, res, next) => {
  res.status(500).json({
    error: "500 Server Error",
    message: error.message,
  });
});

module.exports = app;
