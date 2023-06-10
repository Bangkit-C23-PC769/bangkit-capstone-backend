import express from 'express'
import StationController from '../controller/StationController.js'
import uploadFile from '../middleware/upload.js'

const router = express.Router()

router.get('/stations', StationController.list)
router.post('/stations', StationController.create)
router.get('/stations/:id', StationController.detail)
router.delete('/stations/:id', StationController.delete)
router.post("/stations/import", uploadFile.single("file"), StationController.import)

export default router