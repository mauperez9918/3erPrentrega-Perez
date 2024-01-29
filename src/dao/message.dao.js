import messageModel from "./models/messages.model.js";

export default class MessageDao {
  static getMessages() {
    return messageModel.find();
  }

  static async createMessage(data) {
    const message = await messageModel.create(data);
    console.log("El mensaje ha sido enviado correctamente.");
    return message;
  }
}
