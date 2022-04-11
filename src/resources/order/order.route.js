const router = require("express").Router();
const orderControllers = require("./order.controller");
const { protect } = require("../../util/auth");
// api/orders
router
  .route("/")
  .get(protect, orderControllers.getAll)
  .post(protect, orderControllers.createOne);

//   api/orders/income
router.route("/income").get(protect, orderControllers.getStats);

//  api/orders/:userId
router
  .route("/:id")
  .put(protect, orderControllers.updateOne)
  .delete(protect, orderControllers.removeOne);
module.exports = router;
