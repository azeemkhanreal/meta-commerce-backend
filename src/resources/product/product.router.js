const router = require("express").Router();
const { protect } = require("../../util/auth");
const productController = require("./product.controller");

// api/products
router
  .route("/")
  .get(protect, productController.getAll) // queries -> new=true,category=jeans
  .post(protect, productController.createOne);

// api/products/:id
router
  .route("/:id")
  .get(protect, productController.getOne)
  .put(protect, productController.updateOne)
  .delete(protect, productController.removeOne);
module.exports = router;
