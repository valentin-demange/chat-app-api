import { Router } from "express";
import {
  getUserChats,
  getUserInfo,
  login,
  logout,
  signup,
} from "../controllers/userController";
const router = Router();
const passport = require("passport");

router.post("/sign-up", signup);
router.post("/login", login);
router.get("/logout", logout);

if (process.env.NODE_ENV == "dev") {
  router.get("/:userId", getUserInfo);
  router.get("/:userId/chats", getUserChats);
} else {
  router.get(
    "/:userId",
    passport.authenticate("jwt", { session: false }),
    getUserInfo
  );
  router.get(
    "/:userId/chats",
    passport.authenticate("jwt", { session: false }),
    getUserChats
  );
}

export default router;
