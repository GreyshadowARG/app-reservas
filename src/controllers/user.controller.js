import User from "../models/User.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) return res.status(204).json({ message: "No users found" });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const deleteUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const deleteUser = await User.findByIdAndDelete(userId);
    res.status(200).json("Usuario eliminado");
  } catch (err) {
    next(err);
  }
};
