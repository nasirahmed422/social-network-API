const router = require("express").Router();
const userController = require("../controllers/user-controller.js");

// /api/user

router.route("/")
    .get(userController.getAllUsers);

router.route("/:id")
    .get(userController.getUserById);

router.route("/post")
    .post(userController.createUser);

router.route("/update/:id")
    .put(userController.updateUser);

router.route("/add/:id/friends/:friendId")
    .put(userController.addFriend);

router.route("/remove/:id/friends/:friendId")
    .put(userController.removeFriend);

router.route("/delete/:id")
    .delete(userController.deleteUser);

module.exports = router;