const vehicle = require('../../../Models/vehicleSchema')


exports.rentedBikes = async(req,res) => {
    try {
     
        vehicle.find({OwnerId : req.query.id} ).then((data) => {
            res.status(200).json(data)
        })
    } catch (error) {
       
        res.status(400).json(error)
    }
}

exports.acceptedRequests = async(req,res) => {
    try {
       
        vehicle.find({$and:[{OwnerId : req.query.id},{Status : "Acccepted"}]}).then((data) => {
            res.status(200).json(data)
        })
    } catch (error) {
        
    }
}

exports.rejectedRequests = async(req,res) => {
    try {
        
        vehicle.find({$and:[{OwnerId : req.query.id},{Status : "Rejected"}]}).then((data) => {
            res.status(200).json(data)
        })
    } catch (error) {
        
    }
}

exports.pendingRequests = async(req,res) => {
    try {
        
        vehicle.find({$and:[{OwnerId : req.query.id},{Status : "Pending"}]}).then((data) => {
            res.status(200).json(data)
        })
    } catch (error) {
        
    }
}