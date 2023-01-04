import { Router } from 'express';
import { Prisma, PrismaClient } from '@prisma/client'

const router = Router();
const prisma = new PrismaClient()

router.post("/sign-up", async (req, res, next) => {

  const { email, password, firstName, lastName } = req.body

  const result = await prisma.user.create({
    data: {
      email,
      password,
      firstName,
      lastName
    },
  })
  res.json(result)
  res.redirect("/");

});
router.post('/login', (req, res) => {
  return res.send("POST login is working !");
});
router.post('/logout', (req, res) => {
  return res.send("POST logout is working !");
});

export default router;