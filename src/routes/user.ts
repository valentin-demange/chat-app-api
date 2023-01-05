import { Router } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
const bcrypt = require("bcryptjs");
const passport = require("passport");

const router = Router();
const prisma = new PrismaClient();

router.post("/sign-up", async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    await bcrypt.hash(password, 10, async (err:any, hashedPassword:string) => {
      
      const result = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
        },
      });

      res.json(result);

    });

  } catch (error) {
    console.error(error);
    res.status(500).send("There was an error while creating a new user");
  }
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/OK",
    failureRedirect: "/KO",
  })
);

router.get("/logout", (req, res, next) => {
  // @ts-ignore
  req.logout(function (err) {
    if (err) {
      console.log("error")
      return next(err);
    }
    res.redirect("/logout");
  });
});

export default router;
