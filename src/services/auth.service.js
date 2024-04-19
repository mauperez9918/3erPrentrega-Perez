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
import CartsDao from "../dao/carts.dao.js";

export default class AuthService {
  static async register(userData) {
    const { first_name, last_name, email, password, age, role } = userData;

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

    const userCart = await CartsDao.newCart();

    const newUser = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashedPass,
      age: age,
      cart: userCart._id,
      role,
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

    user.last_connection = new Date();

    await UsersDao.updateUserById(user, user._id);

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
      `<p>Haga click en el siguiente link para poder recuperar su contraseña</p><a href="https://proyecto-final-perez-production.up.railway.app/createPassword/${recoveryToken}">Haz click aqui para recuperar tu contraseña</a>`
    );

    return recoveryToken;
  }

  static async recoveryPassword(password, token) {
    const userInfo = await verifyToken(token);

    if (!userInfo) {
      throw new Error("El token ha expirado o es invalido.");
    }

    const user = await UsersDao.findUserByEmail(userInfo.email);

    const notValidPassword = isValidPassword(user, password);

    if (notValidPassword) {
      throw new Error("La contraseña no puede haber sido usada anteriormente.");
    }

    const newPassword = createHash(password);

    user.password = newPassword;

    await UsersDao.updateUser(user, user.email);
  }
}
