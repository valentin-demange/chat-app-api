import { Router } from "express";
import {
  deleteChat,
  getInfo,
  getMessages,
  newChat,
} from "../controllers/chatController";
const router = Router();
const passport = require("passport");

if (process.env.NODE_ENV == "dev") {
  router.get("/:chatId/messages", getMessages);
  router.get("/:chatId", getInfo);
  router.post("/new", newChat);
  router.delete("/:chatId", deleteChat);
} else {
  router.get("/:chatId/messages", passport.authenticate("jwt", { session: false }), getMessages);
  router.get("/:chatId", passport.authenticate("jwt", { session: false }), getInfo);
  router.post("/new", passport.authenticate("jwt", { session: false }), newChat);
  router.delete("/:chatId", passport.authenticate("jwt", { session: false }), deleteChat);
}

export default router;
