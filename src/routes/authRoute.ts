import { Router } from "express";
import { login, logout, signup } from "../controllers/authController";
const router = Router();

router.post("/sign-up", signup);
router.post("/login", login);
router.get("/logout", logout);

export default router;
