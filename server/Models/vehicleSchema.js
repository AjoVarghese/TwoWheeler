const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
    OwnerId : {type : String },
    vehicleName : {type : String },
    vehicleModel : {type : String },
    Brand : {type : String },
    EngineNo : {type : String },
    Location : {type : String},
    Color : {type : String },
    Fuel : {type : String },
    Description : {type : String },
    Price : {type : Number },
    Photo : [],
    Assured : {type : Boolean,default : true},
    Status : {type : String}
    // Image1 : {type : String },
    // Image2 : {type : String },
    // Image3 : {type : String },
    // Image4: {type : String }
})

const model = mongoose.model("Vehicles",vehicleSchema)

module.exports = model