import { Sequelize } from "sequelize"
import db from "../config/database.js"

const { DataTypes } = Sequelize

const Stations = db.define('stations', {
    name: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.TEXT,
    },
    latitude: {
        type: DataTypes.FLOAT,
    },
    longitude: {
        type: DataTypes.FLOAT,
    }
}, {
    freezeTableName: true
})

export default Stations