import { Router } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
const bcrypt = require("bcryptjs");
const passport = require("passport");

const router = Router();
const prisma = new PrismaClient();

// router.post("/messages", async (req, res) => {
//   console.log("Hola !!")
// })
router.post("/new", async (req, res) => {
  try {
    const { userId, chatId, message } = req.body;
    const newMessage = await prisma.message.create({
      data: {
        user: {
          connect: { id: Number(userId) },
        },
        chat: {
          connect: { id: Number(chatId) },
        },
        message,
      },
    });
    res.json(newMessage);
  } catch (err:any) {
    res.status(500).send(err.message);
  }
});


export default router;
