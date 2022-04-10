const User = require("../resources/user/user.model");

const register = async (req, res) => {
  const { firstname, username, email, password } = req.body;
  if (!firstname && !username && !email && !password) {
    res.status(400).end("need email and password");
  }
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password)
    return res.status(400).end("need email and password");
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).send("Invalid email ans password combination");
    const match = await user.checkPassword(password);
    if (!match) return res.status(401).send("Invalid password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  register,
  login,
};
