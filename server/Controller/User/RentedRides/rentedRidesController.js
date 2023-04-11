const bikes = require('../../../Models/vehicleSchema')
const booking = require('../../../Models/bookingSchema')

exports.rentedRides = (req,res) => {
    console.log("rentedRides");
    console.log(req.query.id);
    
    try {
        let userId = req.query.id
       booking.aggregate(
        [
            {$match:{userId}},

            {
                '$lookup' : {
                    'from' : 'vehicles',
                    'localField' : 'bikeId',
                    'foreignField' :'_id',
                    'as' : 'bikeData'
                }
            },
            {
                $project : {
                    
                }
            }
        ]
       ).then((data) => {
        console.log(data);
        res.status(200).json(data)
       })
    } catch (error) {
        
    }
}