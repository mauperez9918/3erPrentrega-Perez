import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    products: {
      type: [
        {
          product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
          quantity: { type: Number, default: 1 },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

CartSchema.pre("find", function () {
  this.populate("products.product");
});

export default mongoose.model("Cart", CartSchema);
