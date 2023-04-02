const vehicle = require('../../../Models/vehicleSchema')

exports.searchVehicle = (req,res) => {
    console.log(req.body);
    try {
        vehicle.find({$and:[{vehicleName : 
            {$regex : req.body.searchTerm,$options : 'i'}},
            {Status : "Acccepted"}
        ]}).then((data) => {
            res.status(200).json(data)
        })
    } catch (error) {
        
    }
}