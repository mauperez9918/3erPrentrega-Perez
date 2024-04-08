import UsersDao from "../dao/users.dao.js";
import { GetUsersDto } from "../dto/getUsers.dto.js";

export default class UserService {
  static async getAllUsers() {
    const users = await UsersDao.getAll();
    const getUserDto = users.map((user) => new GetUsersDto(user));
    return getUserDto;
  }

  static async switchRol(uid) {
    const user = await UsersDao.findUserById(uid);

    if (!user) {
      throw new Error("El usuario no existe");
    }

    if (user.role.toUpperCase() === "PREMIUM") {
      user.role = "USER";
    } else if (user.role.toUpperCase() === "USER") {
      user.role = "PREMIUM";
    }

    return await UsersDao.updateUserById(user, uid);
  }

  static async deleteById(uid) {
    return await UsersDao.deleteById(uid);
  }
}
