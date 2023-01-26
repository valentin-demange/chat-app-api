import { Router } from "express";
import { deleteChat, getInfo, getMessages, newChat } from "../controllers/chatController";
const router = Router();

router.get("/:chatId/messages", getMessages);
router.get("/:chatId", getInfo);
router.post("/new", newChat);
router.delete("/:chatId", deleteChat);

export default router;
