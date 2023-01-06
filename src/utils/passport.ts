import { User } from "@prisma/client";
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

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
