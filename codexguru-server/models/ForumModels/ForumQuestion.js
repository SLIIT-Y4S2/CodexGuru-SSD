import mongoose from "mongoose";
const { Schema } = mongoose;

const ForumQuestionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      max: 100,
    },
    description: {
      type: String,
      required: true,
      max: 1000,
    },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    answers: [{ type: Schema.Types.ObjectId, ref: "ForumAnswer" }],
    views: { type: Number, default: 0 },
  },
  { timestamps: true, collection: "forumQuestion" }
);

ForumQuestionSchema.methods.addAnswer = function (answer) {
  this.answers.push(answer);
  return this.save();
};

ForumQuestionSchema.methods.deleteAnswer = function (answerId) {
  this.answers.pull(answerId);
  return this.save();
};

const ForumQuestion = mongoose.model("ForumQuestion", ForumQuestionSchema);

export default ForumQuestion;
