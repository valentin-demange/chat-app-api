import { User } from '@prisma/client';
import express from 'express'
import routes from './routes';
import { checkAuthenticated } from './utils/passport';

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
    // origin: "*",
    credentials: true,
  })
)
require('./utils/passport');

app.use('/api/users', routes.users)
app.use('/api/chats', checkAuthenticated, routes.chats);
app.use('/api/messages', checkAuthenticated, routes.messages);
app.use('/api/members', checkAuthenticated, routes.members);

export default app
