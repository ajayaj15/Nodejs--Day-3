import {Router} from 'express';
import studentService from '../service/studentService.js';
const routes = Router();

routes.post('/', studentService.createStudents);
routes.post('/assignChangeMentorForStudents', studentService.changeMentorForStudents );
routes.get('/previouslyAssignedmentor/:studentId', studentService.getPreviousMentor );

export default routes;