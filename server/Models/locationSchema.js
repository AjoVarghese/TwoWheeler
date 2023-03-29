const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    Location : {type : String}
})

const model = mongoose.model("Location",locationSchema)

module.exports = model