import { Router } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
const bcrypt = require("bcryptjs");
const passport = require("passport");
const _ = require('lodash');
const router = Router();
const prisma = new PrismaClient();

router.post("/sign-up", async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    await bcrypt.hash(
      password,
      10,
      async (err: any, hashedPassword: string) => {
        try {
          const result = await prisma.user.create({
            data: {
              email,
              password: hashedPassword,
              firstName,
              lastName,
            },
          });
          res.status(200).send("Sign-up successful");
        } catch (error:any) {
          if (error.code === "P2002") {
            // user with the given email already exists
            res.status(409).send("A user with the given email already exists");
          } else {
            res.status(500).send("There was an error while creating a new user");
          }
          return next(error);
        }
      }
    );
  } catch (error) {
    return next(error);
  }
});
router.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    (err: any, user: any, info: { message: any }) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).send(info.message);
      }
      // @ts-ignore
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).send("Login successful");
      });
    }
  )(req, res, next);
});
router.get("/logout", (req, res, next) => {
  // @ts-ignore
  req.logout(function (err) {
    if (err) {
      console.log("error");
      return next(err);
    }
    res.redirect("/logout-done");
  });
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
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const userWithoutPassword = _.omit(user, ['password']);
    return res.send(userWithoutPassword);
  } catch (error) {
    return res.status(500).send('An error occurred');
  }
});

export default router;