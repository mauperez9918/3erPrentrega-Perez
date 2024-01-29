import UserService from "../services/users.service.js";
import { verifyToken } from "../utils.js";

export const userRegister = async (req, res) => {
  try {
    await UserService.register(req.body);
    res.status(201).redirect("/");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const userLogin = async (req, res) => {
  try {
    const token = await UserService.login(req.body);

    res
      .cookie("token", token, {
        maxAge: 1000 * 60 * 30,
        httpOnly: true,
      })
      .status(200)
      .redirect("/products");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const current = async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token").redirect("/");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const github = async (req, res) => {};

export const githubcallback = async (req, res) => {
  const token = await UserService.githubcallback(req.body);

  res
    .cookie("token", token, {
      maxAge: 1000 * 60 * 30,
      httpOnly: true,
    })
    .status(200)
    .redirect("/products");
};
