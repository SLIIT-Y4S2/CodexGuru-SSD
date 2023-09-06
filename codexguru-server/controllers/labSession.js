/**
 *  Lab Session Controller
 * TODO: add authentication to createLabSession only instructor can create a lab session
 * TODO: save the lab instructor id in the lab
 *  TODO : update and delete lab session
 */

import Forum from "../models/ForumModels/Forum.js";
import LabSession from "../models/LabSession.js";
import bcrypt from "bcrypt";

/* Function to get all lab sessions */
/* @route   GET /api/lab */
export const getLabSessions = async (req, res) => {
  try {
    const allLabSessions = await LabSession.find();
    if (allLabSessions) {
      res.status(201).json(allLabSessions);
    } else {
      res.status(400);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Function to create a lab session */
/* @route   POST /api/lab */
export const createLabSession = async (req, res) => {
  try {
    const { labSessionName, labSessionEndDateTime, year, semester, password } =
      req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newLabSession = new LabSession({
      labSessionName,
      labSessionEndDateTime,
      year,
      semester,
      password: passwordHash,
    });
    const savedLabSession = await newLabSession.save();
    const forum = new Forum({
      labSession: savedLabSession._id,
    });
    await forum.save();
    res.status(201).json(savedLabSession);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
