const location = require('../../../Models/locationSchema')

exports.getLocations = (req,res) => {
    try {
        location.find().then((data) => {
            res.status(200).json(data)
        })
    } catch (error) {
        
    }
}