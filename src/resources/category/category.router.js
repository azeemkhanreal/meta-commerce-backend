const categoryControllers = require("./category.controller");
const router = require("express").Router();
const { protect } = require("../../util/auth");

router
  .route("/")
  .get(protect, categoryControllers.getAll)
  .post(protect, categoryControllers.createOne);

module.exports = router;
