import { Product } from "../models/product.model.js";

// GET All products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// GET Single product
export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// POST product
export const createProduct = async (req, res) => {
  // seller, price, code, and name are required!
  const {
    name,
    description,
    code,
    category,
    price,
    discount,
    stock,
    images,
    seller,
    reviews,
  } = req.body;
  try {
    const product = await Product.create({
      name,
      description,
      code,
      category,
      price,
      discount,
      stock,
      images,
      seller,
      reviews,
    });

    // send response
    return res.status(200).send({
      message: "Product Created",
      product,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// PATCH product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    code,
    category,
    price,
    discount,
    stock,
    images,
    seller,
    reviews,
  } = req.body;
  try {
    // update product data and push roadmapId, videoId in the array
    const product = await Product.findByIdAndUpdate(id, {
      name,
      description,
      code,
      category,
      price,
      discount,
      stock,
      images,
      seller,
      reviews,
    });
    return res.status(200).send({ message: "Product Updated" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// DELETE product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    return res.status(200).send({ message: "Product Deleted", product });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
