const bikes = require('../../../Models/vehicleSchema')
const booking = require('../../../Models/bookingSchema')

exports.rentedRides = (req,res) => {
    console.log("rentedRides");
    console.log(req.query.id);
    
    try {
        let userId = req.query.id
       booking.aggregate(
        [
            {
              '$match': {
                'userId': userId
              }
            }, {
              '$lookup': {
                'from': 'vehicles', 
                'localField': 'bikeId', 
                'foreignField': '_id', 
                'as': 'result'
              }
            }, {
              '$project': {
                'bikeData': {
                  '$arrayElemAt': [
                    '$result', 0
                  ]
                }, 
                'totalHours': 1, 
                'totalAmount': 1, 
                'location': 1, 
                'needHelmet': 1, 
                'status' : 1,
                'startingTime': '$bookedTimeSlots.startDate', 
                'endingTime': '$bookedTimeSlots.endDate'
              }
            }, {
              '$project': {
                'bikeName': '$bikeData.vehicleName', 
                'bikeModel': '$bikeData.vehicleModel', 
                'color': '$bikeData.Color', 
                'totalHours': 1, 
                'totalAmount': 1, 
                'location': 1, 
                'needHelmet': 1, 
                'startingTime': 1, 
                'endingTime': 1, 
                'status' : 1,
                'photo': '$bikeData.Photo', 
              }
            }
          ]
       ).then((data) => {
        console.log(data);
        // console.log(data[0].photo);
        res.status(200).json(data)
       })
    } catch (error) {
        
    }
}