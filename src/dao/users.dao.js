import UserModel from "./models/user.model.js";

export default class UsersDao {
  static async createUser(user) {
    return await UserModel.create(user);
  }

  static async findUserByEmail(email) {
    return await UserModel.findOne({ email });
  }
}
