const { Thought, User } = require('../models');

const thoughtController = {
  // GET All Thoughts
  getAllThought(req, res) {
    Thought.find({})
      .select('-__v')
      .then(thoughtsData => res.json(thoughtsData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400).json(err);
      });
  },

  // GET Thought By ID
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .select('-__v')
      .then(thoughtsData => {
        if (!thoughtsData) {
          res.status(404).json({ message: 'No thoughts found with this ID!' });
          return;
        }
        res.json(thoughtsData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400).json(err);
      });
  },

  // CREATE Thought
  createThought({ body }, res) {
    Thought.create(body)
      .then(thoughtsData => {
        User.findOneAndUpdate(
          { _id: body.userId },
          { $addToSet: { thoughts: thoughtsData._id } },
          { new: true }
        )
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this ID!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.status(400).json(err));
      })
      .catch(err => res.status(400).json(err));
  },

  // UPDATE Thought By ID
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(thoughtsData => {
        if (!thoughtsData) {
          res.status(404).json({ message: 'No thoughts found with this ID!' });
          return;
        }
        res.json(thoughtsData);
      })
      .catch(err => res.status(400).json(err));
  },

  // DELETE Thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(thoughtsData => {
        if (!thoughtsData) {
          res.status(404).json({ message: 'No thoughts found with this ID!' });
          return;
        }
        User.findOneAndUpdate(
          { userName: thoughtsData.userName },
          { $pull: { thoughts: params.id } }
        )
          .then(() => {
            res.json({ message: "This thought has been successfully deleted!" });
          })
          .catch(err => res.status(400).json(err));
      })
      .catch(err => res.status(400).json(err));
  },

  // ADD Reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(thoughtsData => {
        if (!thoughtsData) {
          res.status(404).json({ message: 'No users found with this ID!' });
          return;
        }
        res.json(thoughtsData);
      })
      .catch(err => res.status(400).json(err));
  },

  // REMOVE Reaction
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { _id: params.reactionId } } },
      { new: true, runValidators: true }
    )
      .then((thoughtsData) => {
        if (!thoughtsData) {
          res.status(404).json({ message: 'No reactions found with this ID!' });
          return;
        }
        console.log('test')
        res.json(thoughtsData);
      })
      .catch(err => res.status(400).json(err));
  }
};

module.exports = thoughtController;
