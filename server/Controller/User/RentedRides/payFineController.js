const bookingSchema = require('../../../Models/bookingSchema')
const bikeSchema = require('../../../Models/vehicleSchema')
const moment = require("moment");
const mongoose = require('mongoose')
const dotenv = require("dotenv");
dotenv.config();
const Stripe = require("stripe");
// const { default: mongoose } = require('mongoose');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.payFine = async(req,res) => {
    console.log('ss');
    console.log(req.body);
    console.log(req.query.id);
    let session
    try {
        const {bikeId,bookingId,startTime,endTime,price,photo,bikeName} = req.body.fineDetails
        const userId = req.query.id
        let currentTime =  moment().format("MMMM Do YYYY, h:mm:ss a");

        let currTime = moment(currentTime,'MMMM Do YYYY, h:mm:ss a')
        let eTime = moment(endTime,'MMMM Do YYYY, h:mm:ss a')

        let diffInHours = currTime.diff(eTime,'hours')
       console.log('DIFFHRS',diffInHours);

        let totalFine = diffInHours > 0 ? diffInHours * 30 : 30
        console.log(totalFine);
        console.log(photo);
        console.log(typeof photo);
        console.log(typeof totalFine);

        session = await stripe.checkout.sessions.create({
            line_items : [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: bikeName,
                            images : photo,
                            description : "Fine for exceeding the ride",
                            metadata : {
                                bike_id : bikeId,  
                            }
                        },
                        unit_amount : totalFine * 100
                    },
                    quantity : 1,
                }
            ],
            mode : "payment",
            success_url : `http://localhost:3000/payment-success?userId=${userId}&bikeId=${bikeId}
            &bookingId=${bookingId}&startTime=${startTime}&endTime=${endTime}`,
            cancel_url: "http://localhost:3000/payment-cancelled",
        })
      console.log(session.url);
        res.status(200).json({url : session.url})

    } catch (error) {
        console.log("ERROR",error);
    }
}



exports.paymentSuccess = async(req,res) => {
  console.log(req.body);
  const {userId,bikeId,bookingId,startTime,endTime} = req.body.fineDetails
  console.log(bookingId);
  console.log(bikeId);
  console.log(typeof bookingId);
  console.log(typeof bikeId);

//   let id = new mongoose.Types.ObjectId(bookingId)

  try {
    let bikes = await bikeSchema.updateOne(
        {
            _id : bikeId
        },
        {
            $pull : {
                BookedTimeSlots : {
                    startDate : startTime,
                    endDate : endTime
                }
            }
        }
    )
    console.log(bikes);

    let bookings = await bookingSchema.updateOne({
        _id : bookingId
    },
    {
        $set : {
            status : "Completed"
        } 
    })
    console.log(bookings);
  } catch (error) {
    console.log('error in fine pay completinf ride',error);
  }
}