/**
 * QuestionRoutes implementation
 */
import express from "express";
import questionController from "../controllers/QuestionController.js";

const router = express.Router();

// Handle GET request at "/all" URI
router.get("/all", questionController.getQuestions);

// Handle GET request at "/:id" URI
router.get("/:id", questionController.getQuestion);

// Handle POST request at "/new" URI
router.post("/new", questionController.addQuestion);

// Handle PUT request at "/:id" URI
router.put("/:id", questionController.updateQuestion);

// Handle DELETE request at "/:id" URI
router.delete("/:id", questionController.deleteQuestion);

export default router;