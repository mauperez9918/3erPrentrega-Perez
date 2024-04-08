import UserModel from "./models/user.model.js";

export default class UsersDao {
  static getAll() {
    return UserModel.find();
  }

  static createUser(user) {
    return UserModel.create(user);
  }

  static findUserByEmail(email) {
    return UserModel.findOne({ email });
  }

  static findUserById(id) {
    return UserModel.findById({ _id: id }).populate("cart");
  }

  static updateUser(user, email) {
    return UserModel.updateOne({ email: email }, { $set: user });
  }

  static updateUserById(user, id) {
    return UserModel.updateOne({ _id: id }, { $set: user });
  }

  static deleteById(id) {
    return UserModel.deleteOne({ _id: id });
  }
}
