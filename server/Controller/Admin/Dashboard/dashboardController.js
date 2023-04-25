const userSchema = require('../../../Models/userSchema')
const bikeSchema = require('../../../Models/vehicleSchema')
const bookingSchema = require('../../../Models/bookingSchema')

exports.getUserCount = (req,res) => {
    try{
        userSchema.find().count().then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            console.log("error in finding users in dashboard",err);
        })
    }catch(err){
       console.log("Dashboard server errir",err);
    }
}

exports.getBikesCount = (req,res) => {
    try {
        bikeSchema.find({
            Status : "Acccepted"
        }).count()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            console.log('Error in finding bike count',err);
        })
    } catch (error) {
        console.log('server error bikes count',error);
    }
}

exports.getRentRequestsCount = (req,res) => {
    try {
        bikeSchema.find({
            Status : "Pending"
        }).count()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            console.log('Error in finding rent requets count',err);
        })
    } catch (error) {
        console.log('server error rent requets count',error);
    }
}

exports.getBookingsCount = (req,res) => {
    try {
         bookingSchema.find().count().then((data) => {
            res.status(200).json(data)
         })
         .catch((err) => {
            console.log("Error in finding booking count",err);
         })
    } catch (error) {
        console.log('Server error in finding booking count',error);
    }
}

exports.getAllDetails = async(req,res) => {
  try {
    let totalUsers = await userSchema.find().count()


    let totalBikes = await bikeSchema.find({
        Status : "Acccepted"
    }).count()

    let totalRentRequests = await bikeSchema.find({
        Status : "Pending"
    }).count()

    let totalBookings = await bookingSchema.find().count()

    let totalPendingBookings = await bookingSchema.find({
        status : "Booked"
    }).count()

    let totalOnRide = await  bookingSchema.find({
        status : "onRide"
    }).count()

    let totalCancelled = await bookingSchema.find({
        status : "Cancelled"
    }).count()
    
    let totalPendingRequests = await bikeSchema.find({
        Status : "Pending"
    }).count()

    let totalRejectedRequests = await bikeSchema.find({
        Status : "Rejected"
    }).count()

    let totalAcceptedRequests = await bikeSchema.find({
        Status : "Acccepted"
    }).count()

    let data = {
        totalUsers,
        totalBikes,
        totalRentRequests,
        totalBookings,totalPendingBookings,
        totalOnRide,
        totalCancelled,
        totalPendingRequests,
        totalRejectedRequests,
        totalAcceptedRequests
    }

    res.status(200).json(data)

  } catch (error) {
     console.log('error in getting dashboard details',error);
  }
}