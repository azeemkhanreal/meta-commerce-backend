const crudControllers = require("../../util/crud");
const Product = require("./product.model");

async function getAll(req, res) {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  let products;
  if (qNew) {
    products = await Product.find().sort({ createdAt: -1 }).limit(5);
  } else if (qCategory) {
    products = await Product.find({
      categories: {
        $in: [qCategory],
      },
    });
  } else {
    products = await Product.find();
  }
  res.status(200).json({ data: products });
}
module.exports = { ...crudControllers(Product), getAll: getAll };
