import { User } from "@prisma/client";
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(new JwtStrategy(opts, async (jwt_payload:any, done:any) => {
    try {
        const user = await prisma.user.findUnique({
          where: {
            id: jwt_payload.id
          },
        });
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    } catch (err) {
        return done(err, false);
    }
}));

passport.use(
  new LocalStrategy(async (username:string, password:string, done:any) => {
    try {
      const user:User = await prisma.user.findUnique({
        where: {
          email: username
        },
      });
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

export const checkAuthenticated = (req:any, res:any, next:any) => {
  if (req.isAuthenticated()) { return next() }
  return res.status(401).send("Login required")
}
