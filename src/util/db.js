const mongoose = require("mongoose");

const connect = () => {
  mongoose.connect(process.env.CONNECTION_URI, () => {
    console.log("Database Connected");
  });
};

module.exports = connect;
