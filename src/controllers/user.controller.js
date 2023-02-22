import Usuario from "../models/Usuario.js";

export const getAllUsers = async (req, res) => {
  const users = await Usuario.find();
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json(users);
};