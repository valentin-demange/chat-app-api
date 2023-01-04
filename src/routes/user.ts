import { Router } from 'express';
import { Prisma, PrismaClient } from '@prisma/client'

const router = Router();
const prisma = new PrismaClient()

router.post(`/signup`, async (req, res) => {
  const { username, password } = req.body
  const result = await prisma.post.create({
    data: {
      title,
      content,
      published: false,
      author: { connect: { email: authorEmail } },
    },
  })
  res.json(result)
})
router.post('/login', (req, res) => {
  return res.send("POST login is working !");
});
router.post('/logout', (req, res) => {
  return res.send("POST logout is working !");
});

export default router;