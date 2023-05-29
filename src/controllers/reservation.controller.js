import Restaurant from "../models/Restaurant.js";
import Reservation from "../models/Reservation.js";

export const newReservation = async (req, res, next) => {
  const { restaurantId } = req.params;

  const { userId, user, date, time, peopleQty, promotionCode, state } =
    req.body;

  const newReservation = new Reservation({
    userId: userId,
    user: user,
    date: date,
    time: time,
    peopleQty: peopleQty,
    promotionCode: promotionCode,
    state: state,
  });
  try {
    await Restaurant.findByIdAndUpdate(restaurantId, {
      $push: { reservations: newReservation },
    });
    console.log("Reserva cargada exitosamente.");
  } catch (err) {
    next(err);
  }
  res.status(200).json("Reserva exitosa");
};

export const deleteReservation = async (req, res, next) => {
  const { restaurantId, reservationId } = req.params;
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(restaurantId, {
      $pull: { reservations: { _id: reservationId } },
    });
    console.log("Reserva eliminada");
    res.status(200).json(restaurant);
  } catch (err) {
    next(err);
  }
};

export const reservationsByRestId = async (req, res) => {
  const restaurantId = req.params;
  const reservations = await Reservation.findById();
  res.status(200).json(reservations);
};

export const checkAvailTime = async (req, res) => {
  const { restaurantId } = req.params;
  const { date, time } = req.body;
  const dateMatchArray = [];
  let counter = 0;
  try {
    const restaurant = await Restaurant.findById(restaurantId);
    const reservations = restaurant.reservations;
    reservations.forEach((reservation) => {
      if (reservation.date === date) {
        dateMatchArray.push(reservation);
      }
    });
    dateMatchArray.forEach((element) => {
      if (element.time === time) {
        counter++;
      }
    });

    if (counter < 10) {
      res.status(200).json("Horario disponible");
    } else {
      res.status(404).json("Horario no disponible");
    }
  } catch (err) {
    next(err);
  }
};

export const checkAvailPeopleQty = async (req, res, next) => {
  const { restaurantId } = req.params;
  const { date, time } = req.body;
  const dateMatchArray = [];
  const timeMatchArray = [];
  let peopleTotal = 0;
  try {
    const restaurant = await Restaurant.findById(restaurantId);
    const reservations = restaurant.reservations;
    reservations.forEach((reservation) => {
      if (reservation.date === date) {
        dateMatchArray.push(reservation);
      }
    });
    dateMatchArray.forEach((element) => {
      if (element.time === time) {
        timeMatchArray.push(element);
      }
    });
    timeMatchArray.forEach((item) => {
      peopleTotal += item.peopleQty
    })
    if(peopleTotal <= 40){
      res.status(200).json({
        "message": "Hay lugar disponible",
        "availableSeats": 40 - peopleTotal
      })
    } else {
      res.status(404).json("No hay lugar disponible para este horario")
    }
    
  } catch (err) {
    next(err);
  }
};
