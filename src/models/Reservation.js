import pkg from "mongoose";

const { Schema, model } = pkg;

const reservationSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    peopleQty: {
      type: Number,
      required: true,
    },
    promotionCode: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    refreshToken: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Reservation", reservationSchema);
