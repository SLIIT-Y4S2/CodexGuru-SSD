import express from "express";
import { getAiChatResponse } from "../controllers/aiChatController.js";

const router = express.Router();

router.post("/", getAiChatResponse);

export default router;