import {Router} from 'express'
import * as reviewsController from "../controllers/reviews.controller.js"

const router = Router()

// rutas reviews
router.post('/newReview/:restaurantId', reviewsController.newReview);
router.get('/getAllReviews', reviewsController.getAllReviews);
router.get('/deleteReviewById/:restaurantId/:reviewId', reviewsController.deleteReviewById);


router.post('/addPuntaje', reviewsController.addPuntaje);

export default router