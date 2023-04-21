import pkg from "mongoose";

const { Schema, model } = pkg;

const reviewSchema = new Schema({
  fecha: {
    type: String,
    required: true,
  },
  usuario: {
    type: String,
    required: true,
  },
  comentario: {
    type: String,
    required: true,
  },
  puntaje: {
    type: Number,
    required: true,
  },
});

const restaurantSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    ciudad: {
      type: String,
      required: true,
    },
    localidad: {
      type: String,
      required: true,
    },
    calle: {
      type: String,
      required: true,
    },
    reservas: {
      type: Array,
      required: true,
    },
    reviews: [reviewSchema],
    puntajesAcumulados: {
      type: Array,
      required: true,
    },
    puntajePromedio: {
      type: Number,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    imagenes: {
      type: Array,
      required: true,
    },
    refreshToken: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Restaurant", restaurantSchema);
