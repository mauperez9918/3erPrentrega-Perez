import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    age: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
