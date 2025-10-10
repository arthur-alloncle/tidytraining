import { Router } from "express";

import { getCourseProjetById, getAllCourseProject, addCourseProject} from "../controllers/courseProjectController.js";

const router = Router();

router.get('/', getAllCourseProject);
router.get('/:id', getCourseProjetById);
router.post('/', addCourseProject);

export default router;
