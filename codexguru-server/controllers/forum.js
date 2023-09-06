// import Forum from "../models/ForumModels/Forum";
import ForumQuestion from "../models/ForumModels/ForumQuestion.js";
import ForumAnswer from "../models/ForumModels/ForumAnswer.js";
import Forum from "../models/ForumModels/Forum.js";
import User from "../models/User.js";

export const getForumQuestions = async (req, res) => {
  try {
    const forum = await Forum.findOne({ labSession: req.params.labId })
      .populate({
        path: "questions",
        populate: {
          path: "author",
          select: "firstName lastName",
        },
      })
      .populate({
        path: "questions",
        populate: {
          path: "answers",
          populate: {
            path: "author",
            select: "firstName lastName",
          },
        },
      });

    if (!forum) throw new Error("No forum found for this lab session");
    const customizedForum = { ...forum._doc };

    res.status(200).json(customizedForum.questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addQuestion = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newQuestion = new ForumQuestion({
      title,
      description,
      author: req.user,
    });
    const savedQuestion = await newQuestion.save();
    const forum = await Forum.findOne({ labSession: req.params.labId });
    if (!forum) throw new Error("No forum found for this lab session");

    forum.addQuestion(savedQuestion);
    res.status(201).json(savedQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addAnswer = async (req, res) => {
  try {
    const { description } = req.body;
    const newAnswer = new ForumAnswer({
      description,
      author: req.user.id,
    });
    const savedAnswer = await newAnswer.save();
    await ForumQuestion.findById(req.params.id).then((question) => {
      question.addAnswer(savedAnswer);
    });
    res.status(201).json(savedAnswer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
