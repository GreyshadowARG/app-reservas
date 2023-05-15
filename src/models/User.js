import pkg from "mongoose";

const { Schema, model } = pkg;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    reservations: {
      pending: { type: Array },
      approved: { type: Array },
      completed: { type: Array },
      canceled: { type: Array },
    },
    points: {
      type: Number,
      required: true,
    },
    subscribed: {
      type: Boolean,
      required: true,
    },
    banned: {
      type: Boolean,
    },
    refreshToken: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("User", userSchema);
