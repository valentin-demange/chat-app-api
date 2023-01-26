import { Router } from "express";
import { getUserChats, getUserInfo } from "../controllers/userController";
const router = Router();

router.get("/:userId", getUserInfo);
router.get('/:userId/chats', getUserChats);

export default router;
