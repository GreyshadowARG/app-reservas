import Restaurant from "../models/Restaurant.js";

export const newReservation = async (req, res) => {
  const { id, fecha, hora, personas, descuento } = req.body;
  const restaurant = await Restaurant.findById(id);
  const dbReservaArray = restaurant.reservas;
  const reservationId = Math.floor(Math.random() * 1000000000);
  const reserva = { 
      id: reservationId,
      fecha: fecha,
      hora: hora,
      personas: personas,
      descuentos: descuento
  };
  dbReservaArray.push(reserva);
  const newReserva = {
    reservas: dbReservaArray,
  };
  await Restaurant.findByIdAndUpdate(restaurant, newReserva);
  res.json("Reserva cargada");
};

export const checkAvailability = async (req, res) => {
  const restaurant = await Restaurant.find();
  const dbReservasArray = restaurant[0].reservas;
  data.messages.forEach(function (message) {
    console.log(message);
  });
  res.status(200).json(dbReservasArray.data);
};
