import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import userModel from "../dao/models/user.model.js";
import config from "./config.js";
import CartsService from "../services/carts.service.js";

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.token;
  }
  return token;
};

const initializePassport = () => {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: config.jwtSecret,
  };

  passport.use(
    "jwt",
    new JwtStrategy(jwtOptions, (payload, done) => {
      return done(null, payload);
    })
  );

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.30ed3de975e1ec27",
        clientSecret: "cf781b394c2fdb7a5ae75ebef759d126186e19a2",
        callbackURL:
          "https://proyecto-final-perez-production.up.railway.app/api/auth/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await userModel.findOne({ email: profile._json.email });

          if (!user) {
            const cart = await CartsService.newCart();
            let newUser = {
              first_name: profile._json.name,
              last_name: "",
              email: profile._json.email,
              password: "",
              age: "",
              cart: cart._id,
            };
            let result = await userModel.create(newUser);
            return done(null, result);
          }
          done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default initializePassport;
