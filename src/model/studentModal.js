import mongoose from "./index.js";
const studentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: [true, 'Student Name is required']
    },
    mentorName: {
        type: String,  
    },
    currentMentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mentor',
        default: null
    },
    previousMentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mentor',
        default: null
    }
}, {
    collection: 'student',
    versionKey: false
});

export default new mongoose.model('student',studentSchema)