import Stations from "../models/StationModel.js";

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

            let station = Stations.findOne({
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
}

export default StationController;