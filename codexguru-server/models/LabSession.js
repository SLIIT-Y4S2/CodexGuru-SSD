import mongoose from "mongoose";

const LabSessionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      max: 20,
    },
    description: {
      type: String,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    duration: {
      type: Number,
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
    module: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    pdfUrl: {
      type: String,
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const LabSession = mongoose.model("LabSession", LabSessionSchema);
export default LabSession;
