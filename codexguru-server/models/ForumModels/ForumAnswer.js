import mongoose from "mongoose";
const { Schema } = mongoose;

const ForumAnswerSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      max: 1000,
    },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    markedAsSolution: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, collection: "forumAnswer" }
);

const ForumAnswer = mongoose.model("ForumAnswer", ForumAnswerSchema);

export default ForumAnswer;
