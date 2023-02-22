import {Router} from 'express'
import * as reviewsController from "../controllers/reviews.controller.js"

const router = Router()

// registro de usuario
router.post('/addReview', reviewsController.addReview);
router.get('/getAllReviews', reviewsController.getAllReviews);


router.post('/addPuntaje', reviewsController.addPuntaje);

export default router