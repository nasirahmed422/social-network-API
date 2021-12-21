const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
  reactionId: {
    type: mongoose.Types.ObjectId,
    required: true,
    default: new mongoose.Types.ObjectId
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280
  },
  userName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  }
  },
  {
    toJSON: {
      getters: true
    },
  }
);

module.exports = ReactionSchema;