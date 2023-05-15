import {Router} from 'express'
import * as userController from "../controllers/user.controller.js"

const router = Router()

router.get('/getAllUsers', userController.getAllUsers);
router.delete('/deleteUserById/:userId', userController.deleteUserById);

export default router