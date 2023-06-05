import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config()

const host = process.env.ç
const user = process.env.DB_USER
const pass = process.env.DB_PASS
const dbName = process.env.DB_NAME

const db = new Sequelize(dbName, user, pass, {
    host: host,
    dialect: 'mysql'
});

export default db;