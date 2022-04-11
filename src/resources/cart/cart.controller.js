const crudControllers = require("../../util/crud");
const Cart = require("./cart.model");

const getOne = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json({ data: cart });
  } catch (error) {
    res.status(500).json({ err });
  }
};

module.exports = crudControllers(Cart);
