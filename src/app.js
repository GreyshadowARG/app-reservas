import express from 'express'
import cors from 'cors'
import corsOptions from './config/corsOptions.js'
//import { verifyJWT } from './middlewares/verifyJwt.js'
import cookieParser from 'cookie-parser'
import credentials from './middlewares/credentials.js'

import users from './routes/user.routes.js'
import register from './routes/register.routes.js'
import auth from './routes/auth.routes.js'
import refreshRoutes from './routes/refresh.routes.js'
import restaurant from './routes/restaurant.routes.js'
import reservation from './routes/reservation.routes.js'
import reviews from './routes/reviews.routes.js'


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions))
app.use(credentials)
app.use(cookieParser())

// rutas
app.use('/api/register', register)
app.use('/api/auth', auth)
app.use('/api/refresh', refreshRoutes)

//app.use (verifyJWT)
app.use('/api/users', users)
app.use('/api/restaurant', restaurant)
app.use('/api/reservation', reservation)
app.use('/api/reviews', reviews)

// middleware
// error handler
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Ups... Algo salió mal"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        massage: errorMessage,
        stack: err.stack,
    })
})

export default app;
