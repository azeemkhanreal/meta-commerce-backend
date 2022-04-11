const router = require("express").Router();
const cartControllers = require("./cart.controller");
const { protect } = require("../../util/auth");

router
  .route("/")
  .get(protect, cartControllers.getAll)
  .post(protect, cartControllers.createOne);

router
  .route("/:id")
  .get(protect, cartControllers.getOne)
  .put(protect, cartControllers.updateOne)
  .delete(protect, cartControllers.removeOne);
module.exports = router;
