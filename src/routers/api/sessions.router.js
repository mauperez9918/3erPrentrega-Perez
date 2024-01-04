import { Router } from "express";
import passport from "passport";

const router = Router();

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/" }),
  async (req, res) => {
    res.redirect("/products");
  }
);

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  (req, res) => {
    // res.status(201).json(user);
    res.redirect("/");
  }
);

router.get("/failregister", (req, res) => {
  res.render("error", { title: "Error", messageError: error.message });
  // res.status(201).json(user);
});

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  (req, res) => {
    // res.status(200).json({ message: "Sesion iniciada correctamente." });
    res.redirect("/products");
  }
);

router.get("/faillogin", (req, res) => {
  res.render("error", { title: "Error", messageError: error.message });
  // res.status(200).json({ message: "Sesion iniciada correctamente." });
});

router.get("/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "No estas autenticado." });
  }

  res.status(200).json(req.session.user);
});

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.render("error", {
        title: "Error",
        messageError: error.message,
      });
    }
  });

  res.redirect("/");
});

export default router;
