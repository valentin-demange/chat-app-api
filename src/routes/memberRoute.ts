import { Router } from "express";
import { newMember } from "../controllers/memberController";
const router = Router();


router.post("/new", newMember);


export default router;
