// lab attendance

import LabSession from "../models/LabSession.js";

// Controller to get details of a specific lab session by ID
export const getLabSessionAttandanceById = async (req, res) => {
  try {
    const labSession = await LabSession.findById(req.params.labId).populate(
     { path: "enrolledStudents.user", select: "firstName lastName" });
    // const labSession = await LabSession.findById(req.params.labId).populate("enrolledStudents.user")
    if (!labSession) {
      return res.status(404).json({ error: "Lab session not found" });
    }
    res.json(labSession);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch lab session" });
  }
};
