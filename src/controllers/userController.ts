import { PrismaClient } from "@prisma/client";
import { GENERAL_CHAT_ID } from "../utils/constants";
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

  export const logout = (req: any, res:any, next:any) => {
    req.logout(function (err: any) {
      if (err) {
        return next(err);
      }
      return res.status(200).send({ message: "Successfully logged out" });
    });
  }

export const login = async (req: any, res:any, next:any) => {
  passport.authenticate(
    "local",
    (err: any, user: any, info: { message: any }) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).send(info.message);
      }
      req.logIn(user, (err: any) => {
        if (err) {
          return next(err);
        }
        // generate a signed son web token with the contents of user object and return it in the response
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        const userWithoutPassword = _.omit(user, ["password"]);

        return res.status(200).json({ user:userWithoutPassword, token });
      });
    }
  )(req, res, next);
}

export const signup = async (req:any, res:any, next:any) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    await bcrypt.hash(
      password,
      10,
      async (err: any, hashedPassword: string) => {
        let result;
        try {
          result = await prisma.user.create({
            data: {
              email,
              password: hashedPassword,
              firstName,
              lastName,
            },
          });
        } catch (error: any) {
          if (error.code === "P2002") {
            // user with the given email already exists
            res.status(409).send("A user with the given email already exists");
          } else {
            res
              .status(500)
              .send("There was an error while creating a new user");
          }
          return next(error);
        }

        try {
          const newMember = await prisma.member.create({
            data: {
              user: {
                connect: { id: result.id },
              },
              chat: {
                connect: { id: Number(GENERAL_CHAT_ID) },
              },
            },
          });
          res.status(200).send("User has been created");
        } catch (err: any) {
          res
            .status(500)
            .send(
              "User has been successfully created but it has not been added to the general chat room"
            );
        }
      }
    );
  } catch (error) {
    return next(error);
  }
}