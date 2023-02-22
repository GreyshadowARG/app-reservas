import Restaurant from "../models/Restaurant.js";

// Cargar nueva review
export const addReview = async (req, res) => {
  const restaurant = await Restaurant.find();
  const dbReviewArray = restaurant[0].reviews;
  const dbPuntajesAcumuladosArray = restaurant[0].puntajesAcumulados;

  function promedioPuntaje(dbPuntajesAcumuladosArray) {
    var i = 0, summ = 0, ArrayLen = dbPuntajesAcumuladosArray.length;
    while (i < ArrayLen) {
      summ = summ + dbPuntajesAcumuladosArray[i++];
  }
    const prom = summ / ArrayLen
    return Math.round(prom * 10) / 10;
  }

  const today = new Date();
  const date = `${today.getDay()}/${today.getMonth()}/${today.getFullYear()} - ${today.getHours()}:${today.getUTCMinutes()} hs`;
  const id = Math.floor(Math.random() * 1000000000);
  let comentario = req.body
  comentario["fecha"] = date
  comentario["_id"] = id
  const puntaje = comentario.puntaje
  dbReviewArray.push(comentario);
  dbPuntajesAcumuladosArray.push(puntaje)
  const nuevoPromedio = promedioPuntaje(dbPuntajesAcumuladosArray);
  const newReview = {
    reviews: dbReviewArray,
    puntajesAcumulados: dbPuntajesAcumuladosArray,
    puntajePromedio: nuevoPromedio,
  };
  await Restaurant.findByIdAndUpdate(restaurant, newReview);
  res.status(200).json(comentario);
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
