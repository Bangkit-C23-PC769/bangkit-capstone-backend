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
}

export default StationController;