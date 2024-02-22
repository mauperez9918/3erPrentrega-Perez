import userModel from "./models/user.model.js";
import UserModel from "./models/user.model.js";

export default class UsersDao {
  static createUser(user) {
    return UserModel.create(user);
  }

  static findUserByEmail(email) {
    return UserModel.findOne({ email }).populate("cart");
  }

  static updateUser(user, uid) {
    userModel.findOne({ _id: uid }, { $set: user });
  }
}
