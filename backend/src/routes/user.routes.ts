import { Router } from "express";
import { findUserById } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import { findUserByIdSchema } from "../schemas/user.schema.js";

const router = Router();

router.get('/:id', validate(findUserByIdSchema), findUserById);

export default router