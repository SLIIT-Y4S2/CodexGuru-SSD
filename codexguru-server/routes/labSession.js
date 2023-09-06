import express from "express";
import { getLabSessions, createLabSession } from "../controllers/labSession.js";

const router = express.Router();

router.get("/", getLabSessions);
router.post("/", createLabSession);

export default router;
