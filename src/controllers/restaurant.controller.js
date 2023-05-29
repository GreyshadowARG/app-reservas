import Restaurant from "../models/Restaurant.js";
import Menu from "../models/Menu.js";

export const newRestaurant = async (req, res, next) => {
  const {
    _id,
    name,
    description,
    city,
    address,
    reservations,
    menu,
    reviews,
    ratingsArray,
    ratingProm,
    tags,
    imgs,
  } = req.body;

  try {
    const newRestaurant = new Restaurant({
      userID: _id,
      name: name,
      description: description,
      city: city,
      address: address,
      reservations: reservations,
      menu: menu,
      reviews: reviews,
      ratingsArray: ratingsArray,
      ratingProm: ratingProm,
      tags: tags,
      imgs: imgs,
    });
    const restaurantLoaded = await newRestaurant.save();
    console.log(`Se ha cargado el restaurant ${name} correctamente.`);
    res.status(201).json(restaurantLoaded);
  } catch (err) {
    next(err);
  }
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
    if (!restaurant) {
      return res.json("No hay ningun restaurant con ese id");
    }
    res.status(200).json(restaurant);
  } catch (err) {
    next(err);
  }
};

export const deleteRestaurantById = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const restaurant = await Restaurant.findByIdAndRemove(restaurantId);
    console.log("Restaurant eliminado.");
    res.status(200).json("Restaurant eliminado");
  } catch (err) {
    next(err);
  }
};

export const newMenu = async (req, res, next) => {
  const { restaurantId } = req.params;
  const { title, description, price } = req.body;
  const newMenu = new Menu({
    title: title,
    description: description,
    price: price,
  });
  try {
    await Restaurant.findByIdAndUpdate(restaurantId, {
      $push: { menu: newMenu },
    });
    console.log("Menu cargado exitosamente.");
    res.status(200).json(newMenu);
  } catch (err) {
    next(err);
  }
};

export const editMenu = async (req, res, next) => {
  const { restaurantId, menuId } = req.params;
  const { title, description, price } = req.body;
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      {
        $set: {
          "menu.$[id]": {
            title: title,
            description: description,
            price: price,
          },
        },
      },
      { arrayFilters: [{ "id._id": menuId }] }
    );

    res.status(200).json("Updateado");
  } catch (err) {
    next(err);
  }
};

export const deleteMenu = async (req, res, next) => {
  const { restaurantId, menuId } = req.params;
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(restaurantId, {
      $pull: { menu: { _id: menuId } },
    });
    res.status(200).json(restaurant);
  } catch (err) {
    next(err);
  }
};

export const prueba = async (req, res) => {
  const { prueba } = req.body;
  console.log(prueba);
  res.status(200).json("aprobado");
};
