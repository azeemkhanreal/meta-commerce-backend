const crudControllers = require("../../util/crud");
const Product = require("./product.model");

async function getAll(req, res) {
  const qNew = req.query.new;
  const qLimit = req.query.limit;
  const qCategory = req.query.category;
  let products;
  if (qNew) {
    products = await Product.find().sort({ createdAt: -1 }).limit(4);
  } else if (qLimit) {
    products = await Product.find().limit(qLimit);
  } else if (qCategory) {
    products = await Product.find({
      categories: {
        $in: [qCategory],
      },
    });
  } else {
    products = await Product.find();
  }
  res.status(200).json(products);
}
module.exports = { ...crudControllers(Product), getAll: getAll };
