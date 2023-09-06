import express from "express";
import { addQuestion, getForumQuestions } from "../controllers/forum.js";

const router = express.Router();

router.get("/:labId", getForumQuestions);
router.post("/:labId/addQuestion", addQuestion);

export default router;
