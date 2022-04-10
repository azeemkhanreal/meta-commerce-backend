const User = require("./user.model");

const getOne = (req, res) => {
  res.json({ hello: "hello" });
};

module.exports = {
  getOne,
};
