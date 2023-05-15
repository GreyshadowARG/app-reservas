import Restaurant from "../models/Restaurant.js";

export const newRestaurant = async (req, res) => {
  const {
    _id,
    name,
    description,
    city,
    address,
    reservations,
    reviews,
    ratingsArray,
    ratingProm,
    tags,
    imgs,
  } = req.body;

  const newRestaurant = new Restaurant({
    userID: _id,
    name: name,
    description: description,
    city: city,
    address: address,
    reservations: reservations,
    reviews: reviews,
    ratingsArray: ratingsArray,
    ratingProm: ratingProm,
    tags: tags,
    imgs: imgs,
  });

  const restaurantLoaded = await newRestaurant.save();
  console.log(`Se ha cargado el restaurant ${name} correctamente.`);
  res.status(201).json(restaurantLoaded);
};

export const getAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    next(err);
  }
};

export const getRestaurantById = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const restaurant = await Restaurant.findById(restaurantId);
    if(!restaurant){
      return res.json("No hay ningun restaurant con ese id")
    }
    res.status(200).json(restaurant);
  } catch (err) {
    next(err)
  }
};

export const deleteRestaurantById = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const restaurant = await Restaurant.findByIdAndRemove(restaurantId);
    console.log("Restaurant eliminado.")
    res.status(200).json("Restaurant eliminado");
  } catch (err) {
    next(err)
  }
};

export const prueba = async (req, res) => {
  const { prueba } = req.body;
  console.log(prueba);
  res.status(200).json("aprobado");
};
