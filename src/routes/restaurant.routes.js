import {Router} from 'express'
import * as restaurantsController from "../controllers/restaurant.controller.js"

const router = Router()

// registro de usuario
router.post('/newRestaurant', restaurantsController.newRestaurant);
router.get('/getAllRestaurants', restaurantsController.getAllRestaurants);
router.get('/getRestaurantById/:restaurantId', restaurantsController.getRestaurantById);
router.delete('/deleteRestaurantById/:restaurantId', restaurantsController.deleteRestaurantById);

// menu
router.post('/newMenu/:restaurantId', restaurantsController.newMenu)
router.put('/editMenu/:restaurantId/:menuId', restaurantsController.editMenu)
router.delete('/deleteMenu/:restaurantId/:menuId', restaurantsController.deleteMenu)

router.post('/prueba', restaurantsController.prueba);

export default router