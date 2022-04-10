const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connect = require("./util/db");
const userRouter = require("./resources/user/user.router");
const { register, login } = require("./util/auth");

dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.disable("x-powered-by");

// api router
app.use("/register", register);
app.use("/login", login);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.end("Hello World!");
});

const start = async () => {
  await connect();
  app.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`);
  });
};
module.exports = start;
