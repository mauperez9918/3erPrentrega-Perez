import UserService from "../services/users.service.js";

export const userRegister = async (req, res, next) => {
  try {
    await UserService.register(req.body);
    res.status(201).redirect("/");
  } catch (error) {
    next(error);
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

export const recoveryPassword = async (req, res) => {
  try {
    const recoveryToken = await UserService.recoveryToken(req.body);
    res
      .cookie("token", recoveryToken, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
      })
      .status(201);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const createPassword = async (req, res) => {
  try {
    await UserService.recoveryPassword(req.user, req.body, req.params);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
