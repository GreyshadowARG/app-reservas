import e from "express";
import Restaurant from "../models/Restaurant.js"

export const addRestaurant = async (req, res) => {
    const {
        _id,
      nombre,
      descripcion,
      ciudad,
      localidad,
      calle,
      reservas,
      reviews,
      puntajesAcumulados,
      puntajePromedio,
      tags,
      imagenes
    } = req.body;
  
    const newRestaurant = new Restaurant({
      userID: _id,
      nombre: nombre,
      descripcion: descripcion,
      ciudad: ciudad,
      localidad: localidad,
      calle: calle,
      reservas: reservas,
      reviews: reviews,
      puntajesAcumulados,
      puntajePromedio: puntajePromedio,
      tags: tags,
      imagenes: imagenes
    });
  
    const restaurantLoaded = await newRestaurant.save();
  
    res.status(201).json(restaurantLoaded);
  };

  export const getAllRestaurants = async (req, res) => {
    const restaurants = await Restaurant.find();
    res.json(restaurants)
  }