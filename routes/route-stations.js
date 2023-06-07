import express from 'express'
import StationController from '../controller/StationController.js'

const router = express.Router()

router.get('/stations', StationController.list)

export default router