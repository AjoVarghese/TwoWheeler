const bookingSchema = require('../../../Models/bookingSchema')
const bikeSchema = require('../../../Models/vehicleSchema')
const moment = require('moment')
const dotenv = require('dotenv')
dotenv.config()
const Stripe = require("stripe")
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)


exports.bikeBookingController = async(req,res) => {
   console.log(req.body.bookingData);
    const {userId,userName,bikeId,bikeDetails,totalHours,totalAmount,needHelmet,bookedTimeSlots,location} = req.body.bookingData
    console.log(bookedTimeSlots);
    let session
    try {
       session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'inr',
              product_data: {
                name: bikeDetails.vehicleName,
                images: [bikeDetails.Photo[0]],
                description: bikeDetails.description,
                metadata : {
                  bike_id : bikeId,
                  totalHours : totalHours,
                  needHelmet : needHelmet,
                  location : location,
                  startDate : bookedTimeSlots.startDate,
                  endDate : bookedTimeSlots.endDate
                }
              },
              unit_amount: totalAmount * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `http://localhost:3000/booking-success?userId=${userId}
                      &userName=${userName}&bikeId=${bikeId}&bikeName=${bikeDetails.vehicleName}
                      &bikeModel=${bikeDetails.vehicleModel}&image=${bikeDetails.Photo[0]}
                      &totalAmount=${totalAmount}&totalHours=${totalHours}
                      &startDate=${bookedTimeSlots.startDate}&endDate=${bookedTimeSlots.endDate}
                      &location=${location}&needHelmet=${needHelmet}`,
        cancel_url: 'http://localhost:3000/booking-cancelled',
      });

      // console.log("SESSIOn",session);
      // res.send({ url: session.url,bookingData : req.body })
      res.status(200).json({url: session.url,bookingData : req.body })
    } catch (error) {
      console.log('STRIPE error',error);
    }

}

exports.createOrderController = async(req,res) => {
  console.log('fff');
  console.log(req.body);

  // bikeSchema.find({_id : req.body.bikeId}).then((data) => {
  //   console.log('kkkk');
  //   console.log(data);
  // })


//   console.log("create order",req.body);
//   console.log(req.query.id);
//   try {
//     const {userId,userName,bikeId,bikeName,bikeModel,image,totalAmount,totalHours,bookedTimeSlots,loc,needHelmet} = req.body.bookingDetails
//     console.log("userId",userId);
//     // create a new booking object with the booking data
//     const booking = new bookingSchema({
//       userId: req.query.id,
//       bikeId: bikeId,
//       totalAmount: totalAmount,
//       totalHours: totalHours,
//       needHelmet: needHelmet,
//       bookedTimeSlots: bookedTimeSlots,
//       location : loc,
//       status : "Booked",
//       bookedAt : moment().format('MMMM Do YYYY, h:mm:ss a'),
//       // stripeSessionId: session.id // store the session id for future reference
//   });

//   try {
//     await booking.save();
//     console.log('Booking saved successfully');

//     // find the bike in the database and update its booking slot field
//     const bike = await bikeSchema.findOneAndUpdate(
//         { _id: bikeId },
//         { $push: { BookedTimeSlots: bookedTimeSlots } },
//         { new: true }
//     );

//     // if the bike does not have any booking slots, create a new array and add the booking slot
//     if (!bike.BookedTimeSlots) {
//         bike.BookedTimeSlots = [bookedTimeSlots];
//         await bike.save();
        
//     }

    

// } catch (err) {
//     console.log('fffffffff',err);;
//     res.status(500).send('Server error');
// }
//   } catch (error) {
    
//   }
  

}
    
