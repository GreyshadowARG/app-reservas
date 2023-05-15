import pkg from "mongoose";

const { Schema, model } = pkg;

const reviewSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    }
  }
);

const Review = model("Review", reviewSchema);

export default Review
