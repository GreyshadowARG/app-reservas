import {Router} from 'express'
import * as userController from "../controllers/user.controller.js"

const router = Router()

// registro de usuario
router.get('/getUsers', userController.getAllUsers);

export default router