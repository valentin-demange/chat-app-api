import { Prisma, PrismaClient } from "@prisma/client";
const bcrypt = require("bcryptjs");
const passport = require("passport");
const prisma = new PrismaClient();

export const newMember = async (req:any, res:any) => {
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
  }