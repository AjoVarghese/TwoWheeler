const bookingSchema = require('../../../Models/bookingSchema')

exports.getPendingBookings = (req,res) => {
    try {
        bookingSchema.find({
            status : "Booked"
        }).count().then((data) => {
            res.status(200).json(data)
        })
    } catch (error) {
        console.log('pending booking error',error);
    }
}

exports.getCancelledBookings = (req,res) => {
    try {
        bookingSchema.find({
            status : "Cancelled"
        }).count().then((data) => {
            res.status(200).json(data)
        })
    } catch (error) {
        console.log('cancelled booking error',error);
    }
}

exports.getOnRideBookings = (req,res) => {
    try {
        bookingSchema.find({
            status : "onRide"
        }).count().then((data) => {
            res.status(200).json(data)
        })
    } catch (error) {
        console.log('onRide booking error',error);
    }
}