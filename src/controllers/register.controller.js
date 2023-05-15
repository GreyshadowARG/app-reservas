import User from "../models/User.js";
import bcrypt from "bcrypt";

export const handleNewUser = async (req, res) => {
  const { firstName, lastName, email, password, subscribed } = req.body;
  if (!firstName || !lastName || !email || !password || !subscribed)
    return res.status(400).json({ message: "Faltan datos." });

  // verificar si el email ya esta registrado en la db
  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate)
    return res.status(409).json({ message: "Email ya fue utilizado" });

  try {
    // encryptacion de password
    const hashedPassword = await bcrypt.hash(password, 10);

    const reservationDefault = {
      pending: [],
      approved: [],
      completed: [],
      canceled: [],
    }

    // creacion y guardado de nuevo usuario
    const result = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      reservations: reservationDefault,
      points: 0,
      subscribed: subscribed,
      banned: false,
    });

    console.log(result);

    res.status(201).json({ success: `Nuevo usuario ${firstName} ${lastName} creado!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
