import UsersDao from "../dao/users.dao.js";
import { GetUsersDto } from "../dto/getUsers.dto.js";

export default class UserService {
  static async getAllUsers() {
    const users = await UsersDao.getAll();
    const getUserDto = users.map((user) => new GetUsersDto(user));
    return getUserDto;
  }

  static async switchRol(userEmail) {
    const user = await UsersDao.findUserByEmail(userEmail);

    if (!user) {
      throw new Error("El usuario no existe");
    }

    if (user.role.toUpperCase() === "PREMIUM") {
      user.role = "USER";
    } else if (user.role.toUpperCase() === "USER") {
      user.role = "PREMIUM";
    }

    return await UsersDao.updateUserById(user, user._id);
  }

  static async deleteUser(userEmail) {
    const user = await UsersDao.findUserByEmail(userEmail);

    if (!user) {
      throw new Error("El usuario no puede ser eliminado ya que no existe");
    }

    return await UsersDao.deleteById(user._id);
  }
}
