import { Router } from "express";
import { Member, Prisma, PrismaClient } from "@prisma/client";
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
    let chat = await prisma.chat.findUnique({
      where: { id: Number(chatId) },
      include: { members: true, messages: { take: 1, orderBy: { createdAt: "desc" } } },
    });
    if (!chat) {
      return res.status(404).send("Chat not found");
    }
    let lastMessageTimestamp;
    if (chat.messages.length > 0) {
      const utcTimestamp = new Date(chat.messages[0].createdAt);
      lastMessageTimestamp = (new Date(utcTimestamp.getTime())).toLocaleString('fr-FR');
    }
    const chatInfo = {
      id: chat.id,
      name: chat.name,
      type: chat.type,
      avatar: chat.avatar,
      membersUid: chat.members.map((obj: Member) => obj.userId),
      lastMessage: lastMessageTimestamp,
    };
    return res.send(chatInfo);
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
});

router.post("/new", async (req, res) => {
  // get the list of member user IDs from the request body
  const memberUserIds = req.body.memberUserIds;

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
