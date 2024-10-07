import { Router } from "express";
import mentorRoutes from "../routes/mentor.js"
import studentRoutes from "../routes/students.js"

const routes = Router();

routes.get('/', (req, res) => {
    res.send(`<div>
        <h1>Welcome to Students Mentor API</h1>
        </div>`)
});

routes.use('/mentor', mentorRoutes)
routes.use('/students', studentRoutes)

export default routes;