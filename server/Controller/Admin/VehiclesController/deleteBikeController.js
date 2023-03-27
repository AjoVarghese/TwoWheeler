const vehicle = require('../../../Models/vehicleSchema')

exports.deleteBike = async(req,res) => {
    console.log("BIKE ID",req.query.id);
    try {
        vehicle.deleteOne({_id : req.query.id}).then(() => {
            vehicle.find({Status : "Acccepted"}).then((data) => {
                console.log("deleted  data");
                res.status(200).json(data)
            })
        })
    } catch (error) {
        
    }
}