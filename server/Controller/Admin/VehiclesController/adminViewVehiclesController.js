const vehicleSchema = require('../../../Models/vehicleSchema')

exports.viewVehicles = async(req,res) => {
   try {
      vehicleSchema.find().then((data) => {
        res.status(200).json(data)
      })
   } catch (error) {
     console.log("VEHICLE ERROR",error);
   }
}