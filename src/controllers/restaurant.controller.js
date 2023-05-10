import Restaurant from "../models/Restaurant.js";

export const addRestaurant = async (req, res) => {
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
  console.log(`Se ha cargado el restaurant ${name} correctamente.` )
  res.status(201).json(restaurantLoaded);
};

export const getAllRestaurants = async (req, res) => {
  const restaurants = await Restaurant.find();
  res.json(restaurants);
};

export const getRestaurantById = async (req, res) => {
  const { id }  = req.params;
  const restaurant = await Restaurant.findById(id);
  res.json(restaurant);
};

export const prueba = async (req, res) => {
  const { prueba }  = req.body;
  console.log(prueba)
  res.json(prueba);
};
