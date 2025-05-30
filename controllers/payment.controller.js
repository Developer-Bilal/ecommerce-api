import { Cart } from "../models/cart.model.js";
import { Payment } from "../models/payment.model.js";
import { stripe } from "../server.js";

// GET All Payments
export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({});
    return res.status(200).send(payments);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// GET Single Payment
export const getPayment = async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await Payment.findById(id);
    return res.status(200).send(payment);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// POST Payment
export const createPayment = async (req, res) => {
  let cartDetails = "682ead13615f093b7fd7ad34";

  let shippingAddress = {
    country: "test",
    city: "test",
    zipcode: "test",
    AddressLine: "test",
  };
  // find cart from cartDetails
  // calculate total amount and save in a variable totalAmountCalculated (in future totalAmountCalculated should equal totalAmount from frontend)
  // create checkout using stripe
  // if successful then create order/payment
  ///////////
  // find cart details
  const cart = await Cart.findOne({ _id: cartDetails }).populate(
    "items.product"
  );
  // calculate total amount
  let totalAmountCalculated = 0;
  cart.items.map((item) => {
    totalAmountCalculated += item.product.price;
  });
  // console.log(totalAmountCalculated);

  // create stripe checkout
  let cartItems = [];
  cart.items.map((item) => {
    // add each item to cartItems in a stripe accepted structure
    cartItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.name,
        },
        unit_amount: item.product.price * 100,
      },
      quantity: item.quantity,
    });
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${process.env.BASE_URL}/success`,
    cancel_url: `${process.env.BASE_URL}`,
    line_items: cartItems,
  });
  // save payment data before redirecting

  await Payment.create({
    cartDetails,
    shippingAddress,
    totalAmount: totalAmountCalculated,
  });
  // redirect the user
  res.redirect(session.url);
};

// PATCH Payment
export const updatePayment = async (req, res) => {
  const { id } = req.params;
  const { cartDetails, totalAmount, status, shippingAddress } = req.body;
  try {
    const payment = await Payment.findByIdAndUpdate(id, {
      cartDetails,
      totalAmount,
      status,
      shippingAddress,
    });
    return res.status(200).send({ message: "Payment Updated" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// DELETE Payment
export const deletePayment = async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await Payment.findByIdAndDelete(id);
    return res.status(200).send({ message: "Payment Deleted", payment });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// create stripe checkout session
export const createCheckoutSession = async (req, res) => {
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
};

// // // checkout function
// app.post("/checkout", async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     mode: "payment",
//     shipping_address_collection: {
//       allowed_countries: ["US", "PK"],
//     },
//     success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
//     cancel_url: `${process.env.BASE_URL}`,
//     line_items: [
//       {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: "Physics Book",
//           },
//           unit_amount: 50 * 100,
//         },
//         quantity: 1,
//       },
//       {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: "Mathematics Book",
//           },
//           unit_amount: 100 * 100,
//         },
//         quantity: 2,
//       },
//     ],
//   });
//   res.redirect(session.url);
// });
