const router = require("express").Router();
const { protect } = require("../../util/auth");
const userController = require("./user.controller");

console.log(userController);
// api endpoint - http://localhost/api/users/
router.route("/").get(protect, userController.getAll); // query -> new = true, limit=5
// api endpoint - http://localhost/api/users/stats
router.route("/stats").get(protect, userController.getStats);
// api endpoint - http://localhost/api/users/:id
router
  .route("/:id")
  .get(protect, userController.getOne)
  .put(protect, userController.updateOne)
  .delete(protect, userController.removeOne);

module.exports = router;
