import {Router} from 'express'
import * as reservationController from "../controllers/reservation.controller.js"

const router = Router()

router.post('/newReservation/:restaurantId', reservationController.newReservation);
router.delete('/deleteReservation/:restaurantId/:reservationId', reservationController.deleteReservation);
router.get('/reservationsByRestId/:restaurantId', reservationController.reservationsByRestId);
router.get('/checkAvailTime', reservationController.checkAvailTime);

//router.delete('/deleteReservationById/:restaurantId/:reservationId', reservationController.deleteReservation);


export default router