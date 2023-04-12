const booking = require('../../../Models/bookingSchema')

exports.getBookedDetails = (req,res) => {
    try {
        booking.aggregate(
            [
                {
                  '$lookup': {
                    'from': 'vehicles', 
                    'localField': 'bikeId', 
                    'foreignField': '_id', 
                    'as': 'result'
                  }
                }, {
                  '$lookup': {
                    'from': 'users', 
                    'localField': 'userId', 
                    'foreignField': '_id', 
                    'as': 'res'
                  }
                }, {
                  '$project': {
                    'bikeData': {
                      '$arrayElemAt': [
                        '$result', 0
                      ]
                    }, 
                    'userData': {
                      '$arrayElemAt': [
                        '$res', 0
                      ]
                    }, 
                    'totalHours': 1, 
                    'totalAmount': 1, 
                    'status': 1, 
                    'needHelmet': 1, 
                    'startingTime': '$bookedTimeSlots.startDate', 
                    'endingTime': '$bookedTimeSlots.endDate'
                  }
                }, {
                  '$project': {
                    'userName': '$userData.Name', 
                    'bikeName': '$bikeData.vehicleName', 
                    'bikeModel': '$bikeData.vehicleModel', 
                    'location': '$bikeData.Location', 
                    'photo': '$bikeData.Photo', 
                    'startingTime': 1, 
                    'endingTime': 1, 
                    'totalHours': 1, 
                    'totalAmount': 1, 
                    'status': 1
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