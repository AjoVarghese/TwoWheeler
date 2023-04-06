const vehicleSchema = require('../../../Models/vehicleSchema')

exports.viewVehicles = async(req,res) => {
   try {
      vehicleSchema.find({Status : "Acccepted"}).then((data) => {
        // console.log("Vehicle store",data);
        res.status(200).json(data)
      })
   } catch (error) {
     console.log("VEHICLE ERROR",error);
   }
}

exports.blabla = async(req,res) => {
  console.log(req.body.Location);
  try {
     vehicleSchema.find(
      {Location : req.body.Location}
     ).sort({Price : 1}).then((data) => {
      res.status(200).json(data)
     })
  } catch (error) {
    
  }
}

//for Pagination
exports.getAllBikes = async(req,res) => {
  vehicleSchema.find({Status : "Acccepted"}).then(async(data) => {
    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.limit) || 2
    const skip = (page - 1) * pageSize

    const pages = Math.ceil(data.length / pageSize)

    data = data.skip(skip).limit(pageSize)
  })
  .catch((err) => {

  })
}