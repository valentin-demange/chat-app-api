import express from "express";
import chatRoute from "./routes/chatRoute";
import memberRoute from "./routes/memberRoute";
import messageRoute from "./routes/messageRoute";
import userRoute from "./routes/userRoute";

const passport = require("passport");
const session = require("express-session");
const app = express();
const cors = require("cors");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    // origin: "*",
    credentials: true,
  })
);
require("./utils/passport");

app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);
app.use("/api/members", memberRoute);

export default app;
