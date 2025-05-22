import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import paymentRouter from "./routes/payment.route.js";
import reviewRouter from "./routes/review.route.js";

import { config } from "dotenv";
config();

const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/reviews", reviewRouter);

// Connect Server
startServer();

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected");
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log("Database Connection Failed!");
    console.log(error.message);
  }
}
