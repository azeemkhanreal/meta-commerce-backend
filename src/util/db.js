const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect(process.env.CONNECTION_URI)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connect;
