const vehicle = require('../../../Models/vehicleSchema')

exports.rentedBikes = async(req,res) => {
    try {
        console.log("user",req.query.id);
        vehicle.find({OwnerId : req.query.id} ).then((data) => {
            res.status(200).json(data)
        })
    } catch (error) {
        console.log("rentedBiked Error",err);
        res.status(400).json(error)
    }
}