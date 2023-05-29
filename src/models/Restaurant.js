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
      type: [
        {
          userId: String,
          user: String,
          date: String,
          time: Number,
          peopleQty: Number,
          promotionCode: String,
          state: String,
        },
      ],
    },
    menu: {
      type: [
        {
          title: String,
          description: String,
          price: Number
        },
      ],
    },
    reviews: {
      type: [
        {
          userId: String,
          user: String,
          rating: Number,
          comment: String,
        },
      ],
    },
    ratingsArray: {
      type: Array,
      required: true,
    },
    ratingProm: {
      type: Number,
      min: 0,
      max: 5,
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
