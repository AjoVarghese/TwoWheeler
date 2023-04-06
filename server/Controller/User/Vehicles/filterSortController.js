const vehicle = require('../../../Models/vehicleSchema')

exports.filterByLocation = (req,res) => {
    try {
        vehicle.find({Location :req.body.Location}).then((data) => {
            res.status(200).json(data)
        })
    } catch (error) {
        
    }
}

