import { Router } from "express";
import { newMessage } from "../controllers/messageController";
const router = Router();
const passport = require("passport");

if (process.env.NODE_ENV == "dev") {
  router.post("/new", newMessage);
} else {
  router.post(
    "/new",
    passport.authenticate("jwt", { session: false }),
    newMessage
  );
}

export default router;
