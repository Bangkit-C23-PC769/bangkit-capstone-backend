import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import db from './config/database.js'
import router from './routes/index.js'
import Users from './models/UserModel.js'
dotenv.config()

const app = express()
const port = 3000

try {
    await db.authenticate()
    console.log('Database connected..')
} catch (error) {
    console.log(`Database not connected : ${error}`)   
}

app.use(cors({credentials: true, origin: '*'}))
app.use(cookieParser())
app.use(express.json())
app.use("/api", router)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})