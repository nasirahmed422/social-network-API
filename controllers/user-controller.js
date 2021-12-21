const { User } = require('../models');

const userController = {
  // get all Users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'userThoughts',
        select: '-__v'
      })
      .populate({
        path: 'userFriends',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(UsersData => res.json(UsersData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one User by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'userThoughts',
        select: '-__v'
      })
      .populate({
        path: 'userFriends',
        select: '-__v'
      })
      .select('-__v')
      .then(UserData => res.json(UserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // create User
  createUser({ body }, res) {
    User.create(body)
      .then(newUserData => res.json(newUserData))
      .catch(err => res.json(err));
  },

  // Update user & user's Thoughts for match
  updateUser: function (req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(User =>
        !User
          ? res.status(404).json({ message: "No User found with this id!" })
          : Thought.updateMany({ _id: { $in: User.userThoughts } },
            { userName: User.userName }
          ))
      .then(res.json({ message: "User and their thoughts have been updated" }))
      .catch(err => res.status(400).json(err));
  },

  // Add friends using addToSet
  addFriend: function (req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, { $addToSet: { userFriends: req.params.friendId } }, { new: true })
      .then(friendData => res.json(friendData))
      .catch(err => res.status(400).json(err))
  },

  // Remove friends using pull
  removeFriend: function (req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, { $pull: { userFriends: req.params.friendId } }, { new: true })
      .then(friendData => res.json(friendData))
      .catch(err => res.status(400).json(err))
  },

  // Deletes User and their thoughts
  deleteUser: function (req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then(User =>
        !User
          ? res.status(404).json({ message: "User was not found" })
          : Thought.deleteMany({ _id: { $in: User.userThoughts } })
      )
      .then(res.json({ message: "User and their thoughts were deleted" }))
      .catch(err => res.status(404).json(err))
  }
};

module.exports = userController;
