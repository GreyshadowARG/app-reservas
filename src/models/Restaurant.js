import pkg from "mongoose";

const { Schema, model } = pkg;

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    reservations: {
      type: Array,
      required: true,
    },
    reviews: {
      type: Array,
      required: true,
    },
    ratingsArray: {
      type: Array,
      required: true,
    },
    ratingProm: {
      type: Number,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    imgs: {
      type: Array,
      required: true,
    },
    refreshToken: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Restaurant", restaurantSchema);
