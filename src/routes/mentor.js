import {Router} from 'express';
import mentorService from '../service/mentorService.js'

const routes = Router();

routes.get('/studentsForParticularMentor/:mentorId', mentorService.getAllStudentsByMentor);
routes.post('/', mentorService.createMentor);
routes.post('/assignStudentsToMentor', mentorService.assignStudentsToMentors)

export default routes;