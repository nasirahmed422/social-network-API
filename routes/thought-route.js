
const router = require("express").Router();
const thoughtController = require("../controllers/thought-controller.js");

// /api/thought"
router.route("/")
    .get(thoughtController.getAllThoughts);

router.route("/:id")
    .get(thoughtController.getThought);

router.route("/post")
    .post(thoughtController.addThought);

router.route("/update/:id")
    .put(thoughtController.updateThought);

router.route("/add/:id/reaction/")
    .put(thoughtController.addThoughtReaction);

router.route("/remove/:id/reaction/:reactionId")
    .put(thoughtController.removeThoughtReaction);

router.route("/delete/:id")
    .delete(thoughtController.deleteThought);

module.exports = router;