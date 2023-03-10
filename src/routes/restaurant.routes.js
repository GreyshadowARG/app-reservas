import {Router} from 'express'
import * as restaurantsController from "../controllers/restaurant.controller.js"

const router = Router()

// registro de usuario
router.post('/addRestaurant', restaurantsController.addRestaurant);
router.get('/getAllRestaurants', restaurantsController.getAllRestaurants);

export default router