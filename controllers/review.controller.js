import { Review } from "../models/review.model.js";

// GET All Reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});
    return res.status(200).send(reviews);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// GET Single Review
export const getReview = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findById(id);
    return res.status(200).send(review);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// POST Review
export const createReview = async (req, res) => {
  //
  const { text, stars, reviewer } = req.body;
  try {
    const review = await Review.create({
      text,
      stars,
      reviewer,
    });

    // send response
    return res.status(200).send({
      message: "Review Created",
      review,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// PATCH Review
export const updateReview = async (req, res) => {
  const { id } = req.params;
  const { text, stars, reviewer } = req.body;
  try {
    const review = await Review.findByIdAndUpdate(id, {
      text,
      stars,
      reviewer,
    });
    return res.status(200).send({ message: "Review Updated" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// DELETE Review
export const deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findByIdAndDelete(id);
    return res.status(200).send({ message: "Review Deleted", review });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
