import Stations from "../models/StationModel.js";
import readXlsxFile from "read-excel-file/node";
import {resolve} from 'path'

class StationController {
    static async list(req, res) {
        try {
            const stations = await Stations.findAll();
            res.json({
                success: true,
                data: stations
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async create(req, res) {
        try {
            const { name, city, address, latitude, longitude } = req.body

            let station = await Stations.findOne({
                where: {
                    name
                }
            })

            if (station !== null) return res.status(400).json({message: "Station already exist"})
            
            station = await Stations.create({
                name, city, address, latitude, longitude
            })

            res.json({
                success: true,
                message: "Create data successfully",
                data: station
            })

        } catch (error) {
            console.log(error)
        }
    }

    static async detail(req, res) {
        try {
            const {id} = req.params
            const station = await Stations.findOne({
                where: {
                    id
                }
            })

            res.json({
                success: true,
                message: "Success",
                data: station
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async delete(req, res) {
        try {
            const {id} = req.params

            let station = Stations.findOne({
                where: {
                    id
                }
            })

            if (station !== null) return res.status(400).json({message: "Id station not found"})

            await Stations.destroy({
                where: {
                    id
                }
            })

            res.json({
                success: true,
                message: "Delete Station Successfully"
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async import(req, res) {
        try {
            if (req.file == undefined) return res.status(400).send("Please upload an excel file!")

            let path = resolve("uploads/" + req.file.filename)

            readXlsxFile(path).then((rows) => {
                rows.shift()

                let stations = []

                rows.forEach((row) => {
                    let station = {
                        name: row[0],
                        city: row[1],
                        address: row[2],
                        latitude: row[3],
                        longitude: row[4]
                    }

                    stations.push(station)
                })

                Stations.bulkCreate(stations)
                    .then(() => {
                        res.status(200).send({
                        message: "Uploaded the file successfully: " + req.file.originalname,
                        });
                    })
                    .catch((error) => {
                        res.status(500).send({
                        message: "Fail to import data into database!",
                        error: error.message,
                        });
                    });
            })


        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: "Could not upload the file: " + req.file.originalname,
            });
        }
    }
}

export default StationController;