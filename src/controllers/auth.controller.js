import Usuario from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
import "dotenv/config";

export const handleLogin =  async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res
            .status(400)
            .json({ message: "Se requiere ingresar email y password" });
    
    const foundUser = await Usuario.findOne({ email: email }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized
    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        const userLogged = `Usuario ${foundUser.firstName} ${foundUser.lastName} logeado`

        // create JWTs
        const accessToken = jwt.sign(
            {
                UserInfo: {
                id: foundUser.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "600s" }
            );
            const refreshToken = jwt.sign(
            { id: foundUser.id }, 
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
            );
            // Saving refreshToken with current user
            foundUser.refreshToken = refreshToken;
            const result = await foundUser.save();

            // Creates Secure Cookie with refresh token
            res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000,
            });

            // Send authorization roles and access token to user
            res.json({ userLogged, accessToken, refreshToken });
        } else {
            res.sendStatus(401);
        }
}