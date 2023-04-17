const booking = require('../../../Models/bookingSchema')
const moment = require('moment')

exports.getBookedDetails = async(req,res) => {
    try {
       let data = await booking.aggregate(
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
        )
        // .then((data) => {
            console.log(data);
            console.log(data[0].status);
            let startTime 
            let endTime
            // let currentTime = moment().unix()
            let currentTime = moment().format('X');

            
            for(let i = 0 ; i < data.length ; i++){
              // startTime = data[i].startingTime.unix()
              // endTime = data[i].endingTime.unix()
              let startTime = moment(data[i].startingTime, 'MMMM Do YYYY, h:mm:ss a').unix();
              let endTime = moment(data[i].endingTime, 'MMMM Do YYYY, h:mm:ss a').unix();
              console.log('----------');
              console.log(startTime);
              console.log(endTime);
            console.log(currentTime);
            
            console.log('------------');
              if(currentTime > endTime){
                console.log(currentTime);
                console.log(startTime);
                console.log(endTime);
                console.log('time exceeded');
                booking.findOneAndUpdate(
                  {
                    _id : data[i]._id
                  },
                  {
                    $set : {
                      status : "Time Exceeded"
                    }
                  }
                  ).then((res) => {
                    console.log("EXCEEDED",res);
                  })
              } else if(currentTime < startTime) {
                console.log('booked');
                booking.findOneAndUpdate(
                  {
                    _id : data[i]._id
                  },
                  {
                    $set : {
                      status : "Booked"
                    }
                  }
                  ).then((res) => {
                    console.log("BOOKED",res);
                  })
                
              } else if(currentTime >= startTime && currentTime <= endTime) {
                console.log("onRide");
               booking.findOneAndUpdate(
                {
                  _id : data[i]._id
                },
                {
                  $set : {
                    status : "onRide"
                  }
                }
                ).then((res) => {
                  console.log("ONRIDE",res);
                })
              }
            }
            
            res.status(200).json(data)
        // })
        
    } catch (error) {
        
    }
}