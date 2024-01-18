import { Router } from "express";
import passport from "passport";
import userModel from "../../dao/models/user.model.js";
import {
  authMiddleware,
  createHash,
  generateToken,
  isValidPassword,
} from "../../utils.js";
import config from "../../config/config.js";

const router = Router();

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { session: false, failureRedirect: "/" }),
  async (req, res) => {
    const token = generateToken(req.user);

    res
      .cookie("token", token, {
        maxAge: 1000 * 60 * 30,
        httpOnly: true,
      })
      .status(200)
      .redirect("/products");
  }
);

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, password, age } = req.body;

  if (!first_name || !last_name) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  const user = await userModel.findOne({ email });

  if (user) {
    return res
      .status(400)
      .json({ message: `Ya existe un usuario con el correo: ${email}` });
  }

  const pass = createHash(password);

  await userModel.create({
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: pass,
    age: age,
  });

  res.status(201).redirect("/");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email === config.adminEmail && password === config.adminPassword) {
    const user = {
      _id: "admin",
      first_name: "Coder",
      last_name: "House",
      email: config.adminEmail,
      age: "55",
      role: "Admin",
    };

    const token = generateToken(user);

    return res
      .cookie("token", token, {
        maxAge: 1000 * 60 * 30,
        httpOnly: true,
      })
      .status(200)
      .redirect("/products");
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "El usuario no existe" });
  }

  const isNotValid = !isValidPassword(user, password);

  if (isNotValid) {
    return res.status(401).json({ message: "Correo o contraseña invalidas" });
  }

  const token = generateToken(user);

  res
    .cookie("token", token, {
      maxAge: 1000 * 60 * 30,
      httpOnly: true,
    })
    .status(200)
    .redirect("/products");
});

router.get("/current", authMiddleware("jwt"), (req, res) => {
  res.status(200).send(req.user);
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

export default router;
