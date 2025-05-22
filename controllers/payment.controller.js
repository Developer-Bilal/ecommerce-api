import { Payment } from "../models/payment.model.js";

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
  //
  const { cartDetails, totalAmount, status, shippingAddress } = req.body;
  try {
    const payment = await Payment.create({
      cartDetails,
      totalAmount,
      status,
      shippingAddress,
    });

    // send response
    return res.status(200).send({
      message: "Payment Created",
      payment,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
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
