const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
    OwnerName : {type : String },
    vehicleName : {type : String },
    vehicleModel : {type : String },
    Brand : {type : String },
    EngineNo : {type : String },
    Color : {type : String },
    Fuel : {type : String },
    Description : {type : String },
    Price : {type : Number },
    Image1 : {type : String },
    Image2 : {type : String },
    Image3 : {type : String },
    Image4: {type : String }
})

const model = mongoose.model("Vehicles",vehicleSchema)

module.exports = model