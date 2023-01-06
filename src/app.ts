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
passport.use(
  new LocalStrategy(async (username:string, password:string, done:any) => {
    try {
      const user:User = await prisma.user.findUnique({
        where: {
          email: username
        },
      });
      console.log(user)

      if (!user) {
        return done(null, false, { message: "Incorrect username" })
      }
      bcrypt.compare(password, user.password, (err:any, res: any) => {
        if (res) {
          // passwords match! log user in
          return done(null, user)
        } else {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" })
        }
      })
    } catch (err) {
      return done(err)
    }
  })
)

passport.serializeUser((user: User, done:any) => {
  done(null, user.id)
})

passport.deserializeUser(async (id: number, done:any) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    })
    done(null, user)
  } catch (error) {
    done(error)
  }
})


app.use('/api/users', routes.user)

export default app
