import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";

import { config } from "dotenv";
config();

const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());

// routes
app.use("/api/v1/users", userRouter);

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
