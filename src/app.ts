import { User } from '@prisma/client';
import express from 'express'
import routes from './routes';

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()

app.use(session({ secret: "blabla", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

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
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" })
      }
      return done(null, user)
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