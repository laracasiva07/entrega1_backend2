import { TicketModel } from "../models/ticket.model.js";

export class TicketRepository {
  async createTicket(data) {
    return await TicketModel.create(data);
  }

  async getAllTickets() {
    return await TicketModel.find();
  }

  async getTicketByCode(code) {
    return await TicketModel.findOne({ code });
  }
}
