const User = require("./user.model");

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
const getAll = async (req, res) => {
  const queries = req.query; // query -> new=true, limit=5
  try {
    const users = queries.new
      ? await User.find().limit(queries.limit).sort({ _id: -1 })
      : await User.find().limit(query.limit);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const updateOne = async (req, res) => {
  console.log(req);
  // check user is admin, if true then accepted to update other not allow to do that
  if (req.user.isAdmin) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json({ data: updatedUser });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  } else {
    res.status(400).end("You are not allow to do that");
  }
};
const removeOne = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndRemove(req.params.id);
    res.status(200).json({ ok: 1 });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const getStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getOne,
  updateOne,
  removeOne,
  getAll,
  getStats,
};
