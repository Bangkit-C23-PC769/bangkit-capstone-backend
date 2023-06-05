import express from 'express'
import UserController from '../controller/UserController.js'
import { verifyToken } from '../middleware/VerifyToken.js'
import { refreshToken } from '../controller/RefreshToken.js'

const router = express.Router()

router.get('/users/me', verifyToken, UserController.getUser)
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/refresh_token', refreshToken)
router.post('/logout', UserController.logout)



export default router