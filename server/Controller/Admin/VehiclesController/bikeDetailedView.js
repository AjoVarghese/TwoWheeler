const vehicle = require('../../../Models/vehicleSchema')

exports.bikeDetailsController = async(req,res) => {
    console.log("BIKE ID",req.query.id);
  try {
      vehicle.findOne({_id : req.query.id}).then((data) => {
        // console.log("Bike detaiks",data);
        res.status(200).json(data)
      })
  } catch (error) {
    console.log("Bike details error",error);
  }
}