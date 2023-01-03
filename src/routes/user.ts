import { Router } from 'express';

const router = Router();

router.post('/signup', (req, res) => {
  return res.send("API signup (post) is working !");
});
router.post('/login', (req, res) => {
  return res.send("API login (post) is working !");
});
router.get('/login', (req, res) => {
  return res.send("API login (get) is working !");
});
router.post('/logout', (req, res) => {
  return res.send("API logout (post) is working !");
});

export default router;