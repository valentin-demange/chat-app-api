import { Router } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
const bcrypt = require("bcryptjs");
const passport = require("passport");

const router = Router();
const prisma = new PrismaClient();


router.post("/new", async (req, res) => {
  try {
    const { userId, chatId } = req.body;
    const newMember = await prisma.member.create({
      data: {
        user: {
          connect: { id: Number(userId) },
        },
        chat: {
          connect: { id: Number(chatId) },
        },
      },
    });
    res.json(newMember);
  } catch (err:any) {
    res.status(500).send(err.message);
  }
});


export default router;
