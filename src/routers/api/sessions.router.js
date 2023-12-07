import { Router } from "express";
import UserModel from "../../dao/models/user.model.js";

const router = Router();

router.post("/sessions/register", async (req, res) => {
  const {
    body: { first_name, last_name, password, email, age },
  } = req;

  if (!first_name || !last_name || !password || !email) {
    // return res
    //   .status(400)
    //   .json({ message: "Todos los campos son requeridos." });
    return res.render("error", {
      title: "Error",
      messageError: "Todos los campos son requeridos",
    });
  }

  const user = await UserModel.create({
    first_name,
    last_name,
    password,
    email,
    age,
  });

  // res.status(201).json(user);
  res.redirect("/login");
});

router.post("/sessions/login", async (req, res) => {
  const {
    body: { password, email },
  } = req;

  if (!password || !email) {
    // return res
    //   .status(400)
    //   .json({ message: "Todos los campos son requeridos." });
    return res.render("error", {
      title: "Error",
      messageError: "Todos los campos son requeridos",
    });
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    // return res.status(401).json({ message: "Correo o contraseña invalidos." });
    return res.render("error", {
      title: "Error",
      messageError: "Correo o contraseña invalidos.",
    });
  }

  if (user.password != password) {
    // return res.status(401).json({ message: "Correo o contraseña invalidos." });
    return res.render("error", {
      title: "Error",
      messageError: "Correo o contraseña invalidos.",
    });
  }

  const { first_name, last_name, age } = user;

  req.session.user = {
    first_name,
    last_name,
    email,
    age,
  };

  // res.status(200).json({ message: "Sesion iniciada correctamente." });

  res.redirect("/profile");
});

router.get("/sessions/me", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "No estas autenticado." });
  }

  res.status(200).json(req.session.user);
});

export default router;
