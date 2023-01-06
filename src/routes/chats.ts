import { Router } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
const bcrypt = require("bcryptjs");
const passport = require("passport");

const router = Router();
const prisma = new PrismaClient();

router.get("/:chatId/messages", async (req, res) => {
  const chatId = Number(req.params.chatId);
  try {
    const messages = await prisma.message.findMany({
      where: { chatId: chatId },
    });
    res.send(messages);
  } catch (e) {
    res.status(500).send({ error: "An error occurred while retrieving messages" });
  }
});
router.get('/:chatId', async (req, res) => {
  const { chatId } = req.params;
  try {
    const chat = await prisma.chat.findUnique({
      where: { id: Number(chatId) },
      include: { members: false, messages: false },
    });
    if (!chat) {
      return res.status(404).send({ error: 'Chat not found' });
    }
    return res.send(chat);
  } catch (error) {
    return res.status(500).send({ error: 'An error occurred' });
  }
});


export default router;
