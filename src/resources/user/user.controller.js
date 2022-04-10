const User = require("./user.model");

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const updateOne = async (req, res) => {
  console.log(req);
  if (req.user._id === req.params.id || req.user.isAdmin) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  } else {
    res.status(400).end("You are not allow to do that");
  }
};

module.exports = {
  getOne,
  updateOne,
};
