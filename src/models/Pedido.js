import pkg from 'mongoose';

const {Schema, model} = pkg

const pedidoSchema = new Schema({
    producto: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    medioPago: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    aclaraciones: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    refreshToken: String
}, {
    timestamps:true,
    versionKey:false
});

export default model ('Pedido', pedidoSchema)