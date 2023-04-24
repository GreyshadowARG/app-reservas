import pkg from "mongoose";

const { Schema, model } = pkg;

const reviewSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  }
);

const Reviews = model("Review", reviewSchema);

export default Reviews
