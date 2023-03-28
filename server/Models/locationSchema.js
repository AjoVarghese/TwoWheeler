const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    Location : {type : String,required : true}
})

const model = mongoose.model("Location",locationSchema)

module.exports = model