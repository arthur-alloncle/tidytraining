import { Router } from "express";

import {
  getCourseProjetById,
  getAllCourseProject,
  addCourseProject,
  getCourseProjectByUserId,
} from "../controllers/courseProject.controller.js";
import { validate } from "../middlewares/validate.js";
import { addCourseProjectSchema, getCourseProjectByUserIdSchema } from "../schemas/courseProject.schema.js";

const router = Router();

router.get("/", getAllCourseProject);
router.get("/:id", getCourseProjetById);
router.get("/me/:id", validate(getCourseProjectByUserIdSchema), getCourseProjectByUserId);
router.post("/", validate(addCourseProjectSchema), addCourseProject);

export default router;
