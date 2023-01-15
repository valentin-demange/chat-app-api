import { Router } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { GENERAL_CHAT_ID } from "../utils/constants";
const bcrypt = require("bcryptjs");
const passport = require("passport");
const _ = require("lodash");
const router = Router();
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

router.get("/test_protected", function (req: any, res, next) {
  console.log(req.user);
  return res.status(200).send("OK");
});
router.get("/:userId", async (req: any, res) => {
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
});
router.get('/:userId/chats', async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const members = await prisma.member.findMany({
      where: { userId: userId },
    });
    if (!members) {
      return res.status(404).send('User not found');
    }
    const chatIds = members.map((member) => member.chatId);
    res.send(chatIds);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
