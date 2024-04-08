import path from "path";
import url from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import config from "../config/config.js";
import { faker } from "@faker-js/faker";

const __filename = path.join(url.fileURLToPath(import.meta.url), "../");

export const __dirname = path.dirname(__filename);

// HashPassword Function //

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// ValidatePassword Function //

export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

// GenErate WebTokensFunction//

export const generateToken = (user, type = "auth") => {
  const payload = {
    id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    age: user.age,
    role: user.role,
    cart: user.cart,
    type,
  };

  return jwt.sign(payload, config.jwtSecret, { expiresIn: "30m" });
};

// Auth Middleware //

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

    if (payload && payload.type !== "auth") {
      return res.redirect("/createPassword:token");
    }

    req.user = payload;

    next();
  })(req, res, next);
};

// Handle Policies Function (ADMIN, USER, PREMIUM... OTHERS) //

export const handlePolicies = (policies) => (req, res, next) => {
  if (policies.includes("PUBLIC")) {
    return next();
  }

  const { user } = req;

  if (!policies.includes(user.role.toUpperCase())) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};

// Generate testing products with FakerJs //

export const generateProduct = () => {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    thumbnail: faker.image.url(),
    code: faker.string.alphanumeric({ length: 8 }),
    stock: faker.number.int({ min: 10000, max: 100000 }),
    category: faker.commerce.department(),
    status: faker.datatype.boolean(0.5),
    datatime: faker.date.birthdate(),
  };
};

// Verify Token Function //
export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwtSecret, (error, payload) => {
      if (error) {
        reject(error);
      } else {
        resolve(payload);
      }
    });
  });
};
