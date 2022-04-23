const mongoose = require("mongoose");
const config = require("./config");

const connect = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected");
  } catch (error) {
    console.log("Database not Connected");
  }
};

module.exports = connect;
