import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    cartDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Success", "Failed", "Shipped", "Delivered"],
      default: "Pending",
      required: true,
    },
    shippingAddress: {
      country: { type: String, required: true },
      city: { type: String, required: true },
      zipcode: { type: String, required: true },
      houseNumber: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = mongoose.model("Payment", paymentSchema);
