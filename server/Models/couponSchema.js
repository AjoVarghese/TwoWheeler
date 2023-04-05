const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema({
    couponName : {type : String},
    couponCode : {type : String}
})

const model =  mongoose.model("Coupons",couponSchema)

module.exports = model