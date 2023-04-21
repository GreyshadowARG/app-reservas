import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";

export const handleNewUser = async (req, res) => {
  const { nombre, apellido, email, password, reservas, puntos, suscripto, baneado} = req.body;
  if (!nombre || !apellido || !email || !password || !reservas || !puntos || !suscripto || !baneado)
    return res.status(400).json({ message: "Faltan datos." });

  // verificar si el email ya esta registrado en la db
  const duplicate = await Usuario.findOne({ email: email }).exec();
  if (duplicate)
    return res.status(409).json({ message: "Email ya fue utilizado" });

  try {
    // encryptacion de password
    const hashedPassword = await bcrypt.hash(password, 10);

    // creacion y guardado de nuevo usuario
    const result = await Usuario.create({
      nombre: nombre,
      apellido: apellido,
      email: email,
      password: hashedPassword,
      reservas: reservas,
      puntos: puntos,
      suscripto: suscripto,
      baneado: baneado,
    });

    console.log(result);

    res.status(201).json({ success: `Nuevo usuario ${nombre} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
