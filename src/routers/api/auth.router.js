import { Router } from "express";
import passport from "passport";
import { authMiddleware } from "../../utils/utils.js";
import {
  userRegister,
  userLogin,
  current,
  logout,
  githubcallback,
  recoveryPassword,
  createPassword,
} from "../../controllers/users.controller.js";

const router = Router();

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { session: false, failureRedirect: "/" }),
  githubcallback
);

router.post("/register", userRegister);

router.post("/login", userLogin);

router.get("/current", authMiddleware("jwt"), current);

router.get("/logout", logout);

router.post("/createPassword/:token", createPassword);

router.post("/recoveryPassword", recoveryPassword);

export default router;
