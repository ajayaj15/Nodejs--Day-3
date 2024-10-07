import mentorModal from '../model/mentorModal.js';
import studentModel from '../model/studentModal.js';
const createStudents = async(req,res)=>{

    try {
        const studentName = req.body
         
        if(studentName){

        const student = await studentModel.findOne({studentName:req.body.studentName})
        if(!student)
        {
          const student = await studentModel.create(req.body)
          res.status(201).send({
            message:"Student Created Successfully",
            student
          })
        }
        else{
            res.status(404).send({
                message:`student ${req.body.studentName} is Already Exist`
            })
        }
        }
        else
        {
            res.status(404).send({
                message:"StudentName is Required"
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal server Error",
            error:error.message
        })
    }

}

const changeMentorForStudents = async(req, res) => {
    try {
        const {studentId, mentorId} = req.body;
        const students = await studentModel.findOne({_id: studentId});

        if(!students){
            return res.status(400).send({
                message:'Students not found'
            })
        }

        const mentor = await mentorModal.findOne({_id:mentorId});

        if(!mentor){
            return res.status(400).send({
                message:'Mentor not found'
            })
        }

        await studentModel.updateOne(
            {_id:studentId},
            {
                $set:{
                    previousMentor: mentorId
                }
            }
        )

        await studentModel.updateOne(
            {_id:studentId},
            {
                $set:{
                    currentMentor: mentorId,
                    mentorName: mentor.mentorName
                }
            }
        )

        const newMentor = await studentModel.findOne({_id:studentId});

        res.status(201).send({
            message: 'Mentor Successfully assigned for the students',
            newMentor
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal server Error",
            error: error.message
        });
    }
}

const getPreviousMentor = async(req, res) => {
    try {
        const {studentId} = req.params;
        const students = await studentModel.findOne({_id:studentId});

        if(!students){
            return res.status(400).send({
                message: 'Students not found',
            })
        }

        const previousMentor = await mentorModal.findOne({ _id: students.previousMentor });


        console.log(previousMentor)
        console.log(students.previousMentor);
        if(!previousMentor){
            return res.status(400).send({
                  message: "Previous mentor not found for this student"
            })
        }
        
        return res.status(200).send({
            message: "Previous Mentor found",
            previousMentor
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal server Error",
            error:error.message

        })
    }
}

export default {
    createStudents,
    changeMentorForStudents,
    getPreviousMentor
}