import mentorModel from "../model/mentorModal.js";
import studentModel from "../model/studentModal.js";

const createMentor = async(req, res) => {
    try {
        let mentor = await mentorModel.findOne({mentorName:req.body.mentorName});

        if(mentor){
            res.status(400).send({
                message: `${req.body.mentorName} already exists`
            })
        }
        else{
            let {mentorName} = req.body;
            await mentorModel.create({mentorName});
            res.status(201).send({
                message:`Mentor ${mentorName} created successfully`
            })
        }
    } catch (error) {
        res.status(500).send({
            message:error.message || 'Internal Server Error',
            error
        })
    }
}

const getAllStudentsByMentor = async(req, res) => {
    try {
        const {mentorId} = req.params;
        if(!mentorId){
            return res.status(400).send({
                message: "Invalid or missing mentorId"
            });
        }

        const students = await studentModel.findOne({currentMentor:mentorId});

        if(students){
            return res.status(200).send({
                message:'Students fetched Successfully',
                students
            })
        }
        else{
            return res.status(400).send({
                message:'No Student found'
            })
        }
    } catch (error) {
        res.status(500).send({
            message:error.message || 'Internal Server Error',
            error
        })
    }
}

const assignStudentsToMentors = async(req, res) => {
    try {
        const { mentorId, studentId } = req.body;
        console.log(mentorId, studentId);
        const student = await studentModel.findOne({_id:studentId});
        if(!student) {
            return res.status(400).send({
                message: 'Student Not Found'
            })
        }
        else if(student.currentMentor){
            return res.status(400).send({
                message: "Mentor already assigned to the student"
            });
        }

        const mentor = await mentorModel.findOne({_id:mentorId});

        if(!mentor){
            return res.status(400).send({
                message: "Mentor not found"
            });
        }

        await studentModel.updateOne(
            {_id:studentId},
            {
                $set:{
                    previousMentor:mentorId
                }
            }
        )

        await studentModel.updateOne(
            {_id:studentId},
            {
                $set:{
                    currentMentor:mentorId,
                    mentorName:mentor.mentorName
                }
            }
        )

        const updatedStudent = await studentModel.findOne({ _id: studentId });
        if (!updatedStudent) {
            return res.status(400).send({
                message: "Student not found after assignment"
            });
        }

        return res.status(201).send({
            message: "Assigned student to mentor successfully",
            updatedStudent
        });


    } catch (error) {
        return res.status(500).send({
            message: "Internal server Error",
            error: error.message
        })
    }
}

export default {
    createMentor,
    getAllStudentsByMentor,
    assignStudentsToMentors
}