import {Router} from 'express'
import * as reservationController from "../controllers/reservation.controller.js"

const router = Router()

router.post('/newReservation', reservationController.newReservation);

router.get('/checkAvailability', reservationController.checkAvailability);

export default router