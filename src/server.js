const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connect = require("./util/db");
const userRouter = require("./resources/user/user.router");
const productRouter = require("./resources/product/product.router");
const cartRouter = require("./resources/cart/cart.router");
const orderRouter = require("./resources/order/order.route");
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
app.use("/api/auth/register", register);
app.use("/api/auth/login", login);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);

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
