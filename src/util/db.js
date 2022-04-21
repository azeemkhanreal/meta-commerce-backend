const mongoose = require("mongoose");
const config = require("./config");

const connect = () => {
  mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connect;
