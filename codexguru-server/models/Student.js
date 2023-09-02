import mongoose from "mongoose";

/**
 * TODO - Needs to completed
 */
const StudentSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
});

const Student = mongoose.model("Student", StudentSchema);

export default Student;

