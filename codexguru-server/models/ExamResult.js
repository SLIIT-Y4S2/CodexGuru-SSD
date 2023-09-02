import mongoose from "mongoose";

const ExamResultSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    examID: {
        type: Number,
        required: true,
        ref: "Exam",
    },
    studentID: {
        type: Number,
        required: true,
        ref: "Student",
    },
    questionsAttempted: {
        type: Number,
        required: true,
    },
    marks: {
        type: Number,
        required: true,
    },
    grade: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    attemptedDate: {
        type: Date,
        default: new Date()
    }
});

const ExamResult = mongoose.model("ExamResult", ExamResultSchema);

export default ExamResult;