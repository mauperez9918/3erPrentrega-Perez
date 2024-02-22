import nodemailer from "nodemailer";
import config from "../config/config.js";

export default class EmailsService {
  static #instance = null;
  constructor() {
    this.transport = nodemailer.createTransport({
      service: config.EMAIL_SERVICE,
      port: config.EMAIL_PORT,
      auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASSWORD,
      },
    });
  }

  sendEmail(to, subject, html, attachments = []) {
    return this.transport.sendMail({
      to,
      from: config.EMAIL_USER,
      subject,
      html,
      attachments,
    });
  }

  static getInstance() {
    if (!EmailsService.#instance) {
      EmailsService.#instance = new EmailsService();
    }
    return EmailsService.#instance;
  }
}
