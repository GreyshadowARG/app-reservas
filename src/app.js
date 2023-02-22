import express from 'express'
import cors from 'cors'
import corsOptions from './config/corsOptions.js'
import credentials from './middlewares/credentials.js'

import user from './routes/user.routes.js'
import register from './routes/register.routes.js'
import restaurant from './routes/restaurant.routes.js'
import reviews from './routes/reviews.routes.js'


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions))
app.use(credentials)

// rutas
app.use('/api', user)
app.use('/api/restaurant', restaurant)
app.use('/api/register', register)
app.use('/api/reviews', reviews)

export default app;
