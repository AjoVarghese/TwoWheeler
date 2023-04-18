const bikes = require('../../../Models/vehicleSchema')
const booking = require('../../../Models/bookingSchema')
const walletSchema = require('../../../Models/walletSchema')

exports.rentedRides = (req,res) => {
    
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
        
        res.status(200).json(data)
       })
    } catch (error) {  
    }
}

exports.cancelRide = (req,res) => {
  try{
  let bikeId = req.query.bikeId
  let bookingId = req.query.bookingId
  let startTime = req.query.startTime
  let endTime = req.query.endTime
  let userId = req.query.userId
  let price = req.query.price
  
   
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
      
     
      booking.updateOne({
        _id : bookingId
      },
      {
        $set : {
          status : "Cancelled"
        },
        
        
      }).then((result) => {
       

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
                  'status' : result.status,
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
         ).then(async(data) => {
          
          let walletExists = await walletSchema.findOne({userId : userId})
          if(!walletExists){
            const newWallet = {
              userId : userId,
              walletAmount : price,
              walletHistory : [
                {
                  Type : "Cancellation Refund",
                  amountAdded : price
                }
              ]
            }
    
            walletSchema.create(newWallet)
          } else {
            walletSchema.updateOne({
              userId : userId
             },
             {
               $inc : {
                 walletAmount : price
               },
               $push : {
                 walletHistory : {
                   Type : "Cancellation Refund",
                   amountRefunded : price
                 }
               }
             }).then((resp) => {
              
               res.status(200).json(data)
             })
          }
      
          
         })
      })
    })
  } catch (error) {
    console.log('some error in cancelling ride',err);
  }
}