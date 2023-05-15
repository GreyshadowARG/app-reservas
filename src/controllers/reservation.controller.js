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
    res.status(200).json(newReservation);
  } catch (err) {
    next(err);
  }
};

export const deleteReservation = async (req, res, next) => {
  const { restaurantId, reservationId } = req.params;
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(restaurantId, {
      $pull: { reservations: { _id: reservationId } },
    });
    console.log("Reserva eliminada")
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
  const { restaurantId, date, time } = req.body;
  const reservation = await Reservation.findOne({
    restaurantId: restaurantId,
    date: date,
    time: time,
  });

  res.status(200).json(reservation);
};

/*
export const newReservation = async (req, res) => {
  const { restaurantId, userId, date, user, time, peopleQty, promotion } = req.body;
  const restaurant = await Restaurant.findById(restaurantId);
  const dbReservationsArray = restaurant.reservations;
  let timeCount = 0;
  let timeArray = [];
  dbReservationsArray.forEach(function (arrayItem) {
    var time = arrayItem.time;
    timeArray.push(time);
  });
  timeArray.forEach(function (element) {
    if (element === time) {
      timeCount++;
    }
  });
  // Establecemos la cantidad de mesas disponibles en ese horario
  if (timeCount < 10) {
    const reservationId = Math.floor(Math.random() * 1000000000);
    const reservation = {
      reservationId: reservationId,
      userId: userId,
      date: date,
      user: user,
      time: time,
      peopleQty: peopleQty,
      promotion: promotion,
    };
    dbReservationsArray.push(reservation);
    const newReservation = {
      reservations: dbReservationsArray,
    };
    await Restaurant.findByIdAndUpdate(restaurant, newReservation);
    console.log("La reserva se ha realizado correctamente.")
    res.json(dbReservationsArray);
  } else {
    res.json("Horarios no disponible.")
  }
};
*/

/*
export const deleteReservation = async (req, res) => {
  const { restaurantId, reservationId } = req.params;
  const restaurant = await Restaurant.findById(restaurantId);
  const reservationsArray = restaurant.reservations
  const index = reservationsArray.findIndex((num) => num === 7);
  /*
  function removeObjectWithId(reservationsArray, reservationId) {
    const objWithIdIndex = reservationsArray.findIndex((obj) => obj.id === reservationId);
  
    if (objWithIdIndex > -1) {
      reservationsArray.splice(objWithIdIndex, 1);
    }
  
    return reservationsArray;
  }
  
  removeObjectWithId(reservationsArray, reservationId);


  const newReservation = {
    reservations: reservationsArray
  }
  await Restaurant.findByIdAndUpdate(restaurant, newReservation)
  res.status(200).json(reservationsArray)
}
*/
