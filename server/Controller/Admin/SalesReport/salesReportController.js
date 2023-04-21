const bookingSchema = require('../../../Models/bookingSchema')
const bikeSchema = require('../../../Models/vehicleSchema')

exports.getSalesReport = (req,res) => {
    try {    
          
        bookingSchema.find().then((data) => {
            res.status(200).json(data)
        })
    } catch (error) {
        console.log('Error in getting sales report',error);
    }
}