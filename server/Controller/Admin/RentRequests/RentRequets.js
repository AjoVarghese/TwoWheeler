const vehicle = require('../../../Models/vehicleSchema')

exports.getRentRequests = async(req,res) => {
    console.log('rent requets');
    try {
        vehicle.find({Status : 'Pending'}).then((data) => {
            console.log("rent",data);
            res.status(200).json(data)
        })
    } catch (error) {
        console.log("Rent req error",error);
    }
}