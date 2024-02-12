import mongoose from "mongoose";

const TicketModel = new mongoose.Schema(
  {
    code: { type: String, unique: true, require: true },
    amount: { type: Number, require: true },
    purchaser: { type: String, require: true },
  },
  {
    timestamps: {
      createdAt: "purchase_datetime",
      updatedAt: "purchase_update_datetime",
    },
  }
);

export default mongoose.model("Ticket", TicketModel);
