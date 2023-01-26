import { Prisma, PrismaClient } from "@prisma/client";
const bcrypt = require("bcryptjs");
const passport = require("passport");
const _ = require("lodash");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

export const getUserInfo = async (req: any, res:any) => {
    const { userId } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(userId) },
      });
  
      // const user = req.user;
      if (!user) {
        return res.status(404).send("User not found");
      }
      const userWithoutPassword = _.omit(user, ["password"]);
      return res.send(userWithoutPassword);
    } catch (error) {
      return res.status(500).send("An error occurred");
    }
  }

  export const getUserChats = async (req:any, res:any) => {
    try {
      const userId = Number(req.params.userId);
      const members = await prisma.member.findMany({
        where: { userId: userId },
        orderBy: { chatId: "asc" },
      });
      if (!members) {
        return res.status(404).send('User not found');
      }
      const chatIds = members.map((member) => member.chatId);
      res.send(chatIds);
    } catch (error) {
      res.status(500).send(error);
    }
  }