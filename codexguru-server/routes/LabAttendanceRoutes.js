import express from "express";
import {
    getLabSessionAttandanceById
} from "../controllers/LabAttendance.js";

const router = express.Router();


// Route to get details of a specific lab session by ID
router.get("/:labId/attendance", getLabSessionAttandanceById);

export default router;
