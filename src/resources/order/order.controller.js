const crudControllers = require("../../util/crud");
const Order = require("./order.model");

const getOne = async (req, res) => {
  try {
    const order = await Order.findOne({ userId: req.params.userId });
    res.status(200).json({ data: order });
  } catch (error) {
    res.status(500).json({ err });
  }
};

const getStats = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json({ data: income });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  ...crudControllers(Order),
  getOne: getOne,
  getStats: getStats,
};
