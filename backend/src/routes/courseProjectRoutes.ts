import { Router } from "express";

import { getCourseProjetById, getAllCourseProject, addCourseProject, getCourseProjectByUserId} from "../controllers/courseProjectController.js";

const router = Router();

router.get('/', getAllCourseProject);
router.get('/:id', getCourseProjetById);
router.get('/me/:id', getCourseProjectByUserId);
router.post('/', addCourseProject);

export default router;
