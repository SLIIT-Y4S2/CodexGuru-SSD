import mongoose from "mongoose";
const { Schema } = mongoose;
import Vote from "./Vote.js"; // eslint-disable-line

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
    score: { type: Number, default: 0 },
    votes: [Vote.schema],
  },
  { timestamps: true, collection: "forumQuestion" }
);

ForumQuestionSchema.methods.vote = function (user, vote) {
  const existingVote = this.votes.find((v) => v.user._id.equals(user));

  if (existingVote) {
    // reset score
    this.score -= existingVote.vote;
    if (vote == 0) {
      // remove vote
      this.votes.pull(existingVote);
    } else {
      //change vote
      this.score += vote;
      existingVote.vote = vote;
    }
  } else if (vote !== 0) {
    // new vote
    this.score += vote;
    this.votes.push({ user, vote });
  }

  return this.save();
};

ForumQuestionSchema.methods.addAnswer = function (answer) {
  this.answers.push(answer);
  return this.save();
};

ForumQuestionSchema.methods.deleteAnswer = function (answerId) {
  this.answers.pull(answerId);
  return this.save();
};

ForumQuestionSchema.post("save", function (doc, next) {
  doc.populate("author", "firstName lastName").then(() => {
    doc
      .populate({
        path: "answers",
        populate: {
          path: "author",
          select: "firstName lastName",
        },
      })
      .then(() => {
        next();
      });
  });
});

const ForumQuestion = mongoose.model("ForumQuestion", ForumQuestionSchema);

export default ForumQuestion;
