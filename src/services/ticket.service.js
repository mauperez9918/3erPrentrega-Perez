import TicketDao from "../dao/ticket.dao.js";
import EmailsService from "./email.service.js";

export default class TicketService {
  static async createTicket(amount, purchaser) {
    const randomCode = Math.random().toString(36).toUpperCase();

    const newTicket = {
      code: randomCode,
      amount: amount,
      purchaser: purchaser,
    };

    const ticket = await TicketDao.create(newTicket);

    const emailService = new EmailsService();
    await emailService.sendEmail(
      purchaser,
      "Aqui esta el codigo de su ticket de compra. Gracias por su preferencia!",
      `<strong>Comprador: ${purchaser}</strong><strong>Codigo: ${randomCode}</strong><strong>Monto a pagar: ${amount}</strong>`
    );

    return ticket;
  }
}
