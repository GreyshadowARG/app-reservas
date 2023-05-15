import Restaurant from "../models/Restaurant.js";
import Review from "../models/Review.js";

// Cargar nueva review
export const newReview = async (req, res, next) => {
  const { restaurantId } = req.params;
  const { userId, user, rating, comment } = req.body;

  try {
    const restaurant = await Restaurant.findById(restaurantId);
    const dbPuntajesAcumuladosArray = restaurant.ratingsArray;

    function promedioPuntaje(dbPuntajesAcumuladosArray) {
      var i = 0,
        summ = 0,
        ArrayLen = dbPuntajesAcumuladosArray.length;
      while (i < ArrayLen) {
        summ = summ + dbPuntajesAcumuladosArray[i++];
      }
      const prom = summ / ArrayLen;
      return Math.round(prom * 10) / 10;
    }

    const today = new Date();
    const date = `${today.getDay()}/${today.getMonth()}/${today.getFullYear()} - ${today.getHours()}:${today.getUTCMinutes()} hs`;
    const userReview = new Review({
      userId: userId,
      date: date,
      user: user,
      rating: rating,
      comment: comment,
    });

    dbPuntajesAcumuladosArray.push(rating);
    const nuevoPromedio = promedioPuntaje(dbPuntajesAcumuladosArray);

    try {
      await Restaurant.findByIdAndUpdate(restaurantId, {
        $push: { reviews: userReview },
        $set: {
          ratingsArray: dbPuntajesAcumuladosArray,
          ratingProm: nuevoPromedio,
        },
      });
      console.log("Review cargada exitosamente.")
      res.json(200);
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

// Ver todas las reviews
export const getAllReviews = async (req, res) => {
  const restaurant = await Restaurant.find();
  const reviews = restaurant[0].reviews;
  res.status(200).json(reviews);
};

// Cargar puntaje
export const addPuntaje = async (req, res) => {
  const restaurant = await Restaurant.find();
  const puntaje = req.body.puntaje;
  const oldPuntaje = restaurant[0].puntaje;
  const newPuntaje = Number(puntaje) + Number(oldPuntaje);
  const promPuntaje = Number(newPuntaje) / 2;
  const finalPuntaje = {
    puntajePromedio: Number(promPuntaje),
  };
  await Restaurant.findByIdAndUpdate(restaurant, finalPuntaje);
  res.status(200).json();
};

// Eliminar una review por id
export const deleteReviewById = async (req, res) => {
  const { restaurantId, reviewId } = req.params;
  const restaurant = await Restaurant.findById(restaurantId);
  const reviews = restaurant.reviews;
  reviews.forEach((review) => {
    review._id === reviewId
      ? console.log("Coincide")
      : console.log("No coincide");
    /*
    if (review._id === reviewId) {
      console.log("coincide");
    }else{
      console.log("no coincide");
    }
  */
  });
  res.json(reviews);

  //const reviewById = reviews.findById(reviewId)

  //reviews.findById();
};
