const bikes = require('../../../Models/vehicleSchema')
const booking = require('../../../Models/bookingSchema')

exports.endRide = (req,res) => {
    let bikeId = req.query.bikeId.trim()
    let bookingId = req.query.bookingId
    let startTime = req.query.startTime
    let endTime = req.query.endTime
    let userId = req.query.userId
    console.log(bikeId);
    console.log(bookingId);
    console.log(userId);
    console.log(startTime);
    console.log(endTime);
    
   
     try {
        bikes.updateOne({
            _id : bikeId
          },
          {
            $pull : {
              BookedTimeSlots : {
                startDate : startTime,
                endDate : endTime
              }
            }
          }).then((resp) => {
            console.log('bookingSlot deleted',resp);
           
            booking.updateOne({
              _id : bookingId
            },
            {
              $set : {
                status : "Completed"
              }
            }).then((result) => {
              console.log('Completed',result);
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
                        'bikeId' : '$bikeData._id',
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
            })
          })
     } catch (error) {
        console.log("error in end ride",error);
     }
      
    
}