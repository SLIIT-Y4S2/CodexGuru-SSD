import express from "express";
import {
  addAnswer,
  addQuestion,
  deleteAnswer,
  deleteQuestion,
  getForumQuestions,
  updateAnswer,
  updateQuestion,
} from "../controllers/forum.js";

const router = express.Router();

router.get("/:labId", getForumQuestions);
router.post("/:labId/addQuestion", addQuestion);
router.post("/questions/:questionId/addAnswer", addAnswer);
router.delete("/questions/:questionId/deleteQuestion", deleteQuestion);
router.delete("/questions/:questionId/answers/:answerId", deleteAnswer);
router.put("/questions/:questionId/updateQuestion", updateQuestion);
router.put("/answers/:answerId/updateAnswer", updateAnswer);

export default router;
