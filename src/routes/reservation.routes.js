import {Router} from 'express'
import * as reservationController from "../controllers/reservation.controller.js"

const router = Router()

router.post('/newReservation', reservationController.newReservation);
router.delete('/deleteReservationById/:restaurantId/:reservationId', reservationController.deleteReservation);


export default router