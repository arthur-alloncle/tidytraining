import { Router } from "express";
import { createUser, findUserById } from "../controllers/userController.js";
import { validate } from "../middlewares/validate.js";
import { createUserSchema, findUserByIdSchema } from "../schemas/user.schema.js";
const router = Router();
router.get('/me/:id', validate(findUserByIdSchema), findUserById);
router.post('/register', validate(createUserSchema), createUser);
export default router;
