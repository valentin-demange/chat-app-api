import { Router } from 'express';

const router = Router();

router.post('/signup', (req, res) => {
  return res.send("POST signup is working !");
});
router.post('/login', (req, res) => {
  return res.send("POST login is working !");
});
router.post('/logout', (req, res) => {
  return res.send("POST logout is working !");
});

export default router;