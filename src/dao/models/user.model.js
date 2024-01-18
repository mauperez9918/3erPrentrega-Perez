import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    age: { type: Number },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    role: { type: String, required: false, default: "user" },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
