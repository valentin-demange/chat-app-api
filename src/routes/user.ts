import { Router } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
const passport = require("passport");

const router = Router();
const prisma = new PrismaClient();

router.post("/sign-up", async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const result = await prisma.user.create({
      data: {
        email,
        password,
        firstName,
        lastName,
      },
    });
    res.json(result);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("There was an error while creating a new user.");
  }
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/OK",
    failureRedirect: "/KO",
  })
);

router.post("/logout", (req, res) => {
  return res.send("POST logout is working !");
});

export default router;
