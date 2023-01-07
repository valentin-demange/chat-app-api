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
    res.status(500).send("An error occurred while retrieving messages");
  }
});
router.get("/:chatId", async (req, res) => {
  const { chatId } = req.params;
  try {
    const chat = await prisma.chat.findUnique({
      where: { id: Number(chatId) },
      include: { members: false, messages: false },
    });
    if (!chat) {
      return res.status(404).send("Chat not found");
    }
    return res.send(chat);
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
});

router.post("/new", async (req, res) => {
  // get the list of member user IDs from the request body
  const memberUserIds = JSON.parse(req.body.memberUserIds);

  console.log(memberUserIds);

  // create a new chat
  const newChat = await prisma.chat.create({
    data: { name: "", type: "private" },
  });

  // create a member object for each user ID
  const memberCreations = memberUserIds.map(async (userId: any) => {
    // create the member objects in the database
    return prisma.member.create({
      data: { userId: userId, chatId: newChat.id },
    });
  });

  await Promise.all(memberCreations);

  res.json(newChat);
});

export default router;
