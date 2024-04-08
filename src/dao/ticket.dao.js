import TicketModel from "../dao/models/ticket.model.js";

export default class TicketDao {
  static create(newTicket) {
    return TicketModel.create(newTicket);
  }
}
