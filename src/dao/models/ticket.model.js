import mongoose from "mongoose";

const TicketModel = new mongoose.Schema({
  code: { type: String, unique: true, require: true },
  amount: { type: Number, require: true },
  purchase_datetime: { type: String, require: true },
  purchaser: { type: String, require: true },
});

export default mongoose.model("Ticket", TicketModel);
