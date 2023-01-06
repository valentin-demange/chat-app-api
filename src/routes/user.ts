import { Router } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
const bcrypt = require("bcryptjs");
const passport = require("passport");

const router = Router();
const prisma = new PrismaClient();

router.post("/sign-up", async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    await bcrypt.hash(
      password,
      10,
      async (err: any, hashedPassword: string) => {
        const result = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            firstName,
            lastName,
          },
        });
      }
    );

    res.redirect("/sign-up-done");
    return next();

  } catch (error) {
    console.error(error);
    res.status(500).send("There was an error while creating a new user");
  }
});
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err: any, user: any, info: { message: any; }) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send({ message: info.message });
    }
    // @ts-ignore
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).send({ message: "Login successful" });
    });
  })(req, res, next);
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

export default router;
