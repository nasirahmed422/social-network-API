const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    required: true,
    default: new Schema.Types.ObjectId
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