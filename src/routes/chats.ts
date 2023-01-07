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
    res
      .status(500)
      .send("An error occurred while retrieving messages");
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

// router.post("/new", async (req, res) => {
//   // get the list of member user IDs from the request body
//   const memberUserIds = req.body.memberUserIds;

//   console.log(memberUserIds)

//   // create a new chat
//   const newChat = await prisma.chat.create({
//     data: { name: "", type: "private" },
//   });

//   // create a member object for each user ID
//   const members = memberUserIds.map((userId: any) => {
//     return { userId: userId, chatId: newChat.id };
//   });

//   // create the member objects in the database
//   await prisma.member.create({ data: members });

//   res.json(newChat);
// });

export default router;
