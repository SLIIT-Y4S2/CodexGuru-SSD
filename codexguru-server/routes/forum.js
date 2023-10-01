import express from "express";
import {
  addAnswer,
  addQuestion,
  deleteAnswer,
  deleteQuestion,
  getForumQuestions,
  updateAnswer,
  updateQuestion,
  approveAnswer,
  upvoteQuestion,
  downvoteQuestion,
  unvoteQuestion,
  upvoteAnswer,
  downvoteAnswer,
  unvoteAnswer,
} from "../controllers/forum.js";

const router = express.Router();

router.get("/:labId", getForumQuestions);
router.post("/:labId/addQuestion", addQuestion);
router.post("/questions/:questionId/addAnswer", addAnswer);
router.delete("/questions/:questionId/deleteQuestion", deleteQuestion);
router.delete("/questions/:questionId/answers/:answerId", deleteAnswer);
router.put("/questions/:questionId/updateQuestion", updateQuestion);
router.put("/answers/:answerId/updateAnswer", updateAnswer);
router.put("/answers/:answerId/approveAnswer", approveAnswer);

// voting
router.put("/questions/:questionId/upVote", upvoteQuestion);
router.put("/questions/:questionId/downVote", downvoteQuestion);
router.put("/questions/:questionId/unVote", unvoteQuestion);

router.put("/answers/:answerId/upVote", upvoteAnswer);
router.put("/answers/:answerId/downVote", downvoteAnswer);
router.put("/answers/:answerId/unVote", unvoteAnswer);

export default router;
