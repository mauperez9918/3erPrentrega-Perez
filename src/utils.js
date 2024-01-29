import path from "path";
import url from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import config from "./config/config.js";

const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

export const generateToken = (user) => {
  const payload = {
    id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    age: user.age,
    role: user.role,
  };

  return jwt.sign(payload, config.jwtSecret, { expiresIn: "30m" });
};

export const authMiddleware = (strategy) => (req, res, next) => {
  passport.authenticate(strategy, function (error, payload, info) {
    if (error) {
      return next(error);
    }

    if (!payload) {
      return res
        .status(401)
        .json({ message: info.message ? info.message : info.toString() });
    }
    req.user = payload;

    next();
  })(req, res, next);
};

export const handlePolicies =
  ([policies]) =>
  async (req, res, next) => {
    if (policies.includes("PUBLIC")) {
      return next();
    }

    const { token } = req.cookies;

    const user = await verifyToken(token);

    if (!policies.includes(user.role.toUpperCase())) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  };

export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwtSecret, (error, payload) => {
      if (error) {
        return reject(false);
      }
      resolve(payload);
    });
  });
};

// const authToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(401).send({ error: "Not authenticated" });
//   const token = authHeader.split(" ")[1];
//   jwt.verify(token, JWT_SECRET, (error, payload) => {
//     if (error) return res.status(403).send({ error: "Not authorized" });

//     res.user = payload;
//     next();
//   });
// };
