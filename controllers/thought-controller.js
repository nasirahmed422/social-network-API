const { Thought, User } = require('../models');

const thoughtController = {
  // get all Thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then(thoughtsData => res.json(thoughtsData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one thought by id
  getThought({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then(thoughtData => res.json(thoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // Add a user thought
  addThought({ params, body }, res) {
    Thought.create(body)
      .then(({ Thought }) => {
        return User.findOneAndUpdate(
          { _id: Thought.userID },
          { $push: { userThoughts: Thought._id } },
          { new: true }
        );
      })
      .then(data => {
        console.log(data);
        if (!data) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(data);
      })
      .catch(err => res.json(err));
  },

  // Update a thought
  updateThought: function (req, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(thoughtData => res.json(thoughtData))
      .catch(err => res.status(400).json(err))
  },

  // PUT thought to add new reaction info
  addThoughtReaction: function (req, res) {
    Thought.findOneAndUpdate({ _id: req.params.id }, { $addToSet: { thoughtReactions: body } }, { new: true })
      .then(reactData => res.json(reactData))
      .catch(err => res.status(400).json(err))
  },

  // Remove a reaction with pull
  removeThoughtReaction: function (req, res) {
    Thought.findOneAndUpdate({ _id: req.params.id }, { $pull: { thoughtReactions: { reactionId: params.reactionId } } }, { new: true })
      .then(reactData => res.json(reactData))
      .catch(err => res.status(422).json(err))
  },

  // Delete thought 
  deleteThought: function (req, res) {
    Thought.findOneAndRemove({ _id: params.id })
      .then(thought =>
        !thought
          ? res.status(404).json({ message: "Invalid ID. Cannot find a user thought." })
          : db.User.findOneAndUpdate({ userThoughts: params.id }, { $pull: { userThoughts: params.id } }, { new: true }
          ))
      .then(thoughtData => res.json(thoughtData))
      .catch(err => res.status(400).json(err))
  }
};

module.exports = thoughtController;
