const router = require("express").Router();
const { protect } = require("../../util/auth");
const productController = require("./product.controller");

// /api/products
router
  .route("/")
  .get(protect, productController.getAll)
  .post(protect, productController.createOne);
router.route("/:id").get(protect, productController.getOne);
module.exports = router;
