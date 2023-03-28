const vehicleSchema = require('../../Models/vehicleSchema')
const requetsSchema = require('../../Models/rentRequests')

exports.acceptRequetsController = async(req,res) => {
    console.log(req.query.id);
    vehicleSchema.updateOne({_id : req.query.id},
    {
        $set : {
            Status : "Acccepted"
        }
    }
    ).then(() => {
        vehicleSchema.find({Status : "Pending"}).then((data) => {
            // console.log("Pending requets",data);
            res.status(200).json(data)
        })
    })
}

exports.rejectRequestsController = async(req,res) => {
    console.log('reject id',req.query.id);
    vehicleSchema.updateOne({_id : req.query.id},
    {
        $set : {
            Status : "Rejected"
        }
    }
    ).then(() => {
        vehicleSchema.find({Status : "Pending"}).then((data) => {
        //    console.log("Rejectea action",data);
           res.status(200).json(data)
        })
    })
}