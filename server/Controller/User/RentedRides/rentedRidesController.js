const bikes = require('../../../Models/vehicleSchema')
const booking = require('../../../Models/bookingSchema')
const walletSchema = require('../../../Models/walletSchema')
const mongoose = require('mongoose')
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

exports.cancelRide = async(req,res) => {
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
                status : "Cancelled"
              }
            }).then((result) => {
              console.log('Cancelled',result);
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
        console.log("error in cancel ride",error);
     }
  
    // bikes.updateOne({
    //   _id : bikeId
    // },
    // {
    //   $pull : {
    //     BookedTimeSlots : {
    //       startDate : startTime,
    //       endDate : endTime
    //     }
    //   }
    // }).then((resp) => {
    //   console.log("resp",resp);
     
    //   booking.updateOne({
    //     _id : bookingId
    //   },
    //   {
    //     $set : {
    //       status : "Cancelled"
    //     },
        
        
    //   })
    //   .then((result) => {
    //    console.log('ere',result);

        // booking.aggregate(
        //   [
        //       {
        //         '$match': {
        //           'userId': userId
        //         }
        //       }, {
        //         '$lookup': {
        //           'from': 'vehicles', 
        //           'localField': 'bikeId', 
        //           'foreignField': '_id', 
        //           'as': 'result'
        //         }
        //       }, {
        //         '$project': {
        //           'bikeData': {
        //             '$arrayElemAt': [
        //               '$result', 0
        //             ]
        //           }, 
        //           'totalHours': 1, 
        //           'totalAmount': 1, 
        //           'location': 1, 
        //           'needHelmet': 1, 
        //           'status' : result.status,
        //           'startingTime': '$bookedTimeSlots.startDate', 
        //           'endingTime': '$bookedTimeSlots.endDate'
        //         }
        //       }, {
        //         '$project': {
        //           'bikeId' : '$bikeData._id',
        //           'bikeName': '$bikeData.vehicleName', 
        //           'bikeModel': '$bikeData.vehicleModel', 
        //           'color': '$bikeData.Color', 
        //           'totalHours': 1, 
        //           'totalAmount': 1, 
        //           'location': 1, 
        //           'needHelmet': 1, 
        //           'startingTime': 1, 
        //           'endingTime': 1, 
        //           'status' : 1,
        //           'photo': '$bikeData.Photo', 
        //         }
        //       }
        //     ]
          // )
        //  .then(async(data) => {
          
        //   let walletExists = await walletSchema.findOne({userId : userId})
        //   if(!walletExists){
        //     const newWallet = {
        //       userId : userId,
        //       walletAmount : price,
        //       walletHistory : [
        //         {
        //           Type : "Cancellation Refund",
        //           amountAdded : price
        //         }
        //       ]
        //     }
    
        //     walletSchema.create(newWallet)
        //   } else {
        //     walletSchema.updateOne({
        //       userId : userId
        //      },
        //      {
        //        $inc : {
        //          walletAmount : price
        //        },
        //        $push : {
        //          walletHistory : {
        //            Type : "Cancellation Refund",
        //            amountRefunded : price
        //          }
        //        }
        //      }).then((resp) => {
              
        //        res.status(200).json(data)
        //      })
        //      .catch((err) => {
        //       console.log(" cancelERROR",err);
        //      })
        //   }
      
          
        //  })
    //   })
    // })
  // } catch (error) {
  //   console.log('some error in cancelling ride',error);
  // }
}