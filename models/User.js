const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Please fill a valid email address']
    },
    userThoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought"
      }
    ],
    userFriends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total count of friends and replies on retrieval
UserSchema.virtual('friendCount').get(function () {
  return this.userFriends.length;
});

const User = model('User', UserSchema);

module.exports = User;
