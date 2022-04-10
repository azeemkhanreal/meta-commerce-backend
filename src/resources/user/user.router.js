const router = require("express").Router();
const userController = require("./user.controller");
// api endpoint - http://localhost/api/users/

router.route("/").get().post();
router.route("/:id").get(userController.getOne).put().delete().patch();

module.exports = router;
