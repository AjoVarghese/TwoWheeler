const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    bikeId : {
        type : Object
    },
    userId : {
        type : String
    },
    bookedTimeSlots:{
        startDate : {
         type :String
        },
        endDate :{
         type :String
        }   
     },
     location : {
        type : String
     },
     needHelmet:{
        type : Boolean
    },
    totalHours :{
        type : Number
    },
    totalAmount :{
        type :Number
    },
    stripeSessionId :{
        type : String
    },
},{
    timestamps : true
}
    
)

const model = mongoose.model("Booking",bookingSchema)

module.exports = model
