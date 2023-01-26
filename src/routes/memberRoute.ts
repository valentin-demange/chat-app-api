import { Router } from "express";
import { newMember } from "../controllers/memberController";
const router = Router();
const passport = require("passport");

if (process.env.NODE_ENV == "dev") {
  router.post("/new", newMember);
} else {
  router.post(
    "/new",
    passport.authenticate("jwt", { session: false }),
    newMember
  );
}

export default router;
