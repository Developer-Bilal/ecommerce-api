import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    stars: {
      type: Number,
      required: true,
    },
    productReviewed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Review = mongoose.model("Review", reviewSchema);
