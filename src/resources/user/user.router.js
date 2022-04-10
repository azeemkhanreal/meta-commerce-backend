const router = require("express").Router();
const { protect } = require("../../util/auth");
const userController = require("./user.controller");
// api endpoint - http://localhost/api/users/

router.route("/").get().post();
router
  .route("/:id")
  .get(protect, userController.getOne)
  .put(protect, userController.updateOne)
  .delete()
  .patch();

module.exports = router;
