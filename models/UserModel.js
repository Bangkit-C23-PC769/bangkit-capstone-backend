import { Sequelize } from "sequelize"
import db from "../config/database.js"

const { DataTypes } = Sequelize

const Users = db.define('users', {
    fullname: {
        type: DataTypes.STRING,
    },
    username: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    refreshToken: {
        type: DataTypes.TEXT,
    }
}, {
    freezeTableName: true
})

export default Users