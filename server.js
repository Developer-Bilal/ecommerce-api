import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import paymentRouter from "./routes/payment.route.js";
import reviewRouter from "./routes/review.route.js";

import { config } from "dotenv";
config();
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_API_SECRET);

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

// middlewares
app.use(express.json());

// home route
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/success", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(
    req.query.session_id,
    { expand: ["payment_intent.payment_method"] }
  );
  console.log(session);
  res.render("success.ejs");
});

app.post("/checkout", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["US", "PK"],
    },
    success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.BASE_URL}`,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Physics Book",
          },
          unit_amount: 50 * 100,
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Mathematics Book",
          },
          unit_amount: 100 * 100,
        },
        quantity: 2,
      },
    ],
  });
  res.redirect(session.url);
});
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
