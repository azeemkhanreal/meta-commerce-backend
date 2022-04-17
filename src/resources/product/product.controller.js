const crudControllers = require("../../util/crud");
const Product = require("./product.model");

async function getAll(req, res) {
  const qNew = req.query.new;
  const qLimit = req.query.limit;
  const qCategory = req.query.category;
  const qSex = req.query.sex;

  if (qNew) {
    const products = await Product.find().sort({ createdAt: -1 }).limit(4);
  } else if (qLimit) {
    const products = await Product.find().limit(qLimit);
  } else if (qSex && qCategory) {
    const products = await Product.find({
      sex: qSex,
      categories: {
        $in: [qCategory],
      },
    });
    res.status(200).json(products);
  } else if (qCategory) {
    const products = await Product.find({
      categories: {
        $in: [qCategory],
      },
    });
    res.status(200).json(products);
  } else if (qSex) {
    products = await Product.find({ sex: qSex });
    res.status(200).json(products);
  } else {
    products = await Product.find();
    res.status(200).json(products);
  }
  // res.status(200).json(products);
}
module.exports = { ...crudControllers(Product), getAll: getAll };
