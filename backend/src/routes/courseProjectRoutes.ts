import { Router } from "express";

import { getCourseProjetById, getAllCourseProject, addCourseProject} from "../controllers/courseProjectController.js";

const router = Router();

router.get('/project/', getAllCourseProject);
router.get('/project/:id', getCourseProjetById);
router.post('/project/', addCourseProject);

export default router;
