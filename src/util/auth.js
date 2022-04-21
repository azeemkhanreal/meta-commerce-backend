const User = require("../resources/user/user.model");
const jwt = require("jsonwebtoken");
const config = require("./config");

const newToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    config.SECRET_KEY,
    {
      expiresIn: "3d",
    }
  );
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.SECRET_KEY, (err, payload) => {
      if (err) reject(err);
      resolve(payload);
    });
  });
};

const register = async (req, res) => {
  const { firstname, username, email, password } = req.body;
  if (!firstname && !username && !email && !password) {
    return res.status(400).end("need email and password");
  }
  try {
    const newUser = await User.create(req.body);
    const token = await newToken(newUser);
    const { password, isAdmin, ...others } = newUser._doc;
    console.log(others);
    res.status(201).json({ ...others, token });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const login = async (req, res) => {
  if (!req.body.email && !req.body.password)
    return res.status(400).end("need email and password");
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send("Invalid email ans password combination");
    const match = await user.checkPassword(req.body.password);
    if (!match) return res.status(401).send("Invalid password");
    const token = newToken(user);
    const { password, isAdmin, ...others } = user._doc;
    res.status(200).json({ ...others, token });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    return res.status(401).end("You are not authenticated");
  }
  if (!bearer.startsWith("Bearer ")) {
    return res.status(401).end("Add Bearer before the token");
  }
  const token = bearer.split(" ")[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (err) {
    return res.status(401).end("Invalid Token");
  }
  try {
    const user = await User.findById(payload.id);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).end("token regenerate");
  }
};

module.exports = {
  register,
  login,
  protect,
};
