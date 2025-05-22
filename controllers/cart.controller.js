import { Cart } from "../models/cart.model.js";

// GET All Carts
export const getCarts = async (req, res) => {
  try {
    const carts = await Cart.find({});
    return res.status(200).send(carts);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// GET Single Cart
export const getCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findById(id);
    return res.status(200).send(cart);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// POST Cart
export const createCart = async (req, res) => {
  //
  const { items, buyer } = req.body;
  try {
    const cart = await Cart.create({
      items,
      buyer,
    });

    // send response
    return res.status(200).send({
      message: "Cart Created",
      cart,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// PATCH Cart
export const updateCart = async (req, res) => {
  const { id } = req.params;
  const { items } = req.body;
  try {
    const cart = await Cart.findByIdAndUpdate(id, {
      items,
    });
    return res.status(200).send({ message: "Cart Updated" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// DELETE Cart
export const deleteCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findByIdAndDelete(id);
    return res.status(200).send({ message: "Cart Deleted", cart });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
