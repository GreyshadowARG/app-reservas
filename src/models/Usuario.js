import pkg from 'mongoose';

const {Schema, model} = pkg

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    reservas: {
        resPendientes: {
            type: Array,
            required: true
        },
        resAprobadas: {
            type: Array,
            required: true
        }
    },
    puntos: {
        type: String,
        required: true
    },
    suscripto: {
        type: Boolean,
        required: true
    },
    baneado: {
        type: String,
        required: true
    },
    refreshToken: String
}, {
    timestamps:true,
    versionKey:false
});

export default model ('Usuario', usuarioSchema)