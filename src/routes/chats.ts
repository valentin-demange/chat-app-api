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

export default router;
