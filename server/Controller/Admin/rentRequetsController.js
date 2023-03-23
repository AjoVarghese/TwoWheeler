const vehicleSchema = require('../../Models/vehicleSchema')
const requetsSchema = require('../../Models/rentRequests')

exports.acceptRequetsController = async(req,res) => {
    console.log(req.query.id);
    vehicleSchema.updateOne({_id : req.query.id},
    {
        $set : {
            Status : "Accepted"
        }
    }
    ).then(() => {
        console.log("ALL set");
    })
}