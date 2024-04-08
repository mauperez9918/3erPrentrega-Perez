import UserService from "../services/user.service.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const switchRole = async (req, res) => {
  const { uid } = req.params;
  try {
    await UserService.switchRol(uid);
    res.status(204).end();
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deleteById = async (req, res) => {
  const { uid } = req.user;
  try {
    await UserService.deleteById(uid);
    res.status(203).end();
  } catch (error) {
    res.status(500).json(error.message);
  }
};
