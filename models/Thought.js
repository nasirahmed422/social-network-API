const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const reactions = require("./Reaction");

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    userName: {
      type: String,
      required: true
    },
    thoughtReactions: [reactions],
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    }
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.thoughtReactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;