import Usuario from '../models/Usuario.js';
import bcrypt from 'bcrypt';

export const handleNewUser = async (req, res) => {
    const { name, phone, email, password, points, suscribed } = req.body;
    if (!name || !phone || !email || !password || !points || !suscribed) return res.status(400).json({ 'message': 'Faltan datos.' });

    // verificar si el email ya esta registrado en la db
    const duplicate = await Usuario.findOne({ email: email }).exec();
    if (duplicate) return res.sendStatus(409).json({ 'message': 'Email ya fue utilizado' }); //Conflict 

    try {
        // encryptacion de password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // creacion y guardado de nuevo usuario
        const result = await Usuario.create({
            "name": name,
            "phone": phone,
            "email": email,
            "password": hashedPassword,
            "points": points,
            "suscribed": suscribed,
        });
        
        console.log(result);

        res.status(201).json({ 'success': `Nuevo usuario ${name} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}