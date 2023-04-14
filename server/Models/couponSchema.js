const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema({
    couponName : {type : String},
    couponCode : {type : String},
    couponPrice : {type : Number}
})

const model =  mongoose.model("Coupons",couponSchema)

module.exports = model