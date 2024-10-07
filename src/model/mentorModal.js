import mongoose from './index.js'
const mentorSchema = new mongoose.Schema({
    mentorName: {
        type: String,
        required: [true, 'Mentor Name is required']   

    }
}, {
    collection: 'mentor',
    versionKey: false
});

export default new mongoose.model('mentor',mentorSchema)