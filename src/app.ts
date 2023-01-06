import { User } from '@prisma/client';
import express from 'express'
import routes from './routes';

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()
const bcrypt = require("bcryptjs");
const cors = require('cors')

app.use(session({ secret: "blabla", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
)
require('./utils/passport');

app.use('/api/users', routes.users)
app.use('/api/chats', routes.chats)
app.use('/api/messages', routes.messages)

export default app
