import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config()

const user = process.env.DB_USER
const pass = process.env.DB_PASS
const dbName = process.env.DB_NAME
const dbInstance = process.env.DB_INSTANCE
const host = process.env.DB_HOST

const db = new Sequelize(dbName, user, pass, {
    host: process.env.ENV === 'prod' ? `/cloudsql/${dbInstance}`: host,
    dialect: 'mysql',
    dialectOptions: {
        socketPath: process.env.ENV === 'prod' ? `/cloudsql/${dbInstance}`: null,
    }
});


console.log(`Connecting to database : ${host},  ${user}, ${dbName}`)

export default db;