import mongoose from "mongoose";

const LabSessionSchema = new mongoose.Schema(
  {
    labSessionName: {
      type: String,
      required: true,
      max: 20,
      unique: true,
    },

    labSessionStartDateTime: {
      type: Date,
      default: Date.now,
    },
    labSessionEndDateTime: {
      type: Date,
      required: true,
      default: Date.now,
    },
    year: {
      type: Number,
      required: true,
      min: 1,
      max: 4,
    },
    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 2,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
  },
  {
    timestamps: true,
  }
);

const LabSession = mongoose.model("LabSession", LabSessionSchema);
export default LabSession;
