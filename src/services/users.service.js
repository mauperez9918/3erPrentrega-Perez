import UsersDao from "../dao/users.dao.js";
import {
  createHash,
  generateToken,
  isValidPassword,
  verifyToken,
} from "../utils/utils.js";
import config from "../config/config.js";
import { generateUserError } from "../utils/CauseMessageError.js";
import { CustomError } from "../utils/CustomError.js";
import EnumsError from "../utils/EnumsError.js";
import EmailsService from "./email.service.js";

export default class UsersService {
  static async register(userData) {
    const { first_name, last_name, email, password, age } = userData;

    if (!first_name || !email || !password) {
      CustomError.create({
        name: "Invalid data user",
        cause: generateUserError(userData),
        message: "Ocurrio un error mientras intentamos crear un nuevo usuario.",
        code: EnumsError.BAD_REQUEST_ERROR,
      });
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

  static async recoveryToken(userData) {
    const { email } = userData;

    const user = await UsersDao.findUserByEmail(email);

    if (!user) {
      throw new Error("El usuario no existe");
    }

    const recoveryToken = generateToken(user, "recovery");

    const emailService = new EmailsService();
    await emailService.sendEmail(
      email,
      "Link para recuperar tu contraseña",
      `<p>Haga click en el siguiente link para poder recuperar su contraseña</p><a href=http://localhost:8080/createPassword/${recoveryToken}>Haz click aqui para recuperar tu contraseña</a>`
    );

    return recoveryToken;
  }

  static async recoveryPassword(body, params) {
    const { password } = body;
    const { token } = params;

    const userInfo = await verifyToken(token);

    // if (!password) {
    //   throw new Error("Contraseña invalida");
    // }

    // user.password = password;
    // return await UsersDao.updateUser(user, user._id);
  }
}
