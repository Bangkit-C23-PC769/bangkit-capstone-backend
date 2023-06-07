import express from 'express'
import StationController from '../controller/StationController.js'

const router = express.Router()

router.get('/stations', StationController.list)
router.post('/stations', StationController.create)
router.get('/stations/:id', StationController.detail)
router.delete('/stations/:id', StationController.delete)


export default router