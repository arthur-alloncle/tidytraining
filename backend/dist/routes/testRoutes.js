import { Router } from "express";
import { testRoute } from "../controllers/defaultController.js";
const router = Router();
router.get('/', testRoute);
export default router;
