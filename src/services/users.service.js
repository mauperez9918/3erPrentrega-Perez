import UsersDao from "../dao/users.dao.js";
import { createHash, generateToken, isValidPassword } from "../utils.js";
import config from "../config/config.js";

export default class UsersService {
  static async register(userData) {
    const { first_name, last_name, email, password, age } = userData;

    if (!first_name || !last_name) {
      throw new Error("Todos los campos son requeridos");
    }

    const user = await UsersDao.findUserByEmail(email);

    if (user) {
      throw new Error(`Ya existe un usuario con el correo: ${email}`);
    }

    const hashedPass = createHash(password);

    const newUser = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashedPass,
      age: age,
    };

    await UsersDao.createUser(newUser);
  }

  static async login(userData) {
    const { email, password } = userData;

    if (email === config.adminEmail && password === config.adminPassword) {
      const user = {
        _id: "admin",
        first_name: "Coder",
        last_name: "House",
        email: config.adminEmail,
        age: "55",
        role: "Admin",
      };

      return generateToken(user);
    }

    const user = await UsersDao.findUserByEmail(email);

    if (!user) {
      throw new Error("El usuario no existe");
    }

    const isNotValid = !isValidPassword(user, password);

    if (isNotValid) {
      throw new Error("Correo o contraseña invalidas");
    }

    return generateToken(user);
  }

  static async githubcallback(data) {
    const token = generateToken(data);

    return token;
  }
}
