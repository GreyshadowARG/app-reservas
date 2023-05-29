import pkg from "mongoose";

const { Schema, model } = pkg;

const menuSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    }
  }
);

const Menu = model("Menu", menuSchema);

export default Menu
