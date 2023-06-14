import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import db from './config/database.js'
import routerUsers from './routes/route-users.js'
import routerStations from './routes/route-stations.js'
import routerHome from './routes/route-home.js'

import path from 'path'

import Users from './models/UserModel.js'
import Stations from './models/StationModel.js'
dotenv.config()

const app = express()
const port = 3000

// views engine setup
// app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

try {
    await db.authenticate()
    console.log('Database connected..')
    await Stations.sync()
    await Users.sync()
} catch (error) {
    console.log(`Database not connected : ${error}`)   
}

app.use(cors({credentials: true, origin: '*'}))
app.use(cookieParser())
app.use(express.json())
app.use("/api", routerUsers)
app.use("/api", routerStations)
app.use("/", routerHome);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})