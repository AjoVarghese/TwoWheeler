const bookingSchema = require('../../../Models/bookingSchema')
const bikeSchema = require('../../../Models/vehicleSchema')
const dotenv = require('dotenv')
dotenv.config()
const Stripe = require("stripe")
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)


exports.bikeBookingController = async(req,res) => {
   
    const {userId,userName,bikeId,bikeDetails,totalHours,totalAmount,needHelmet,bookedTimeSlots,location} = req.body.bookingData
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
              unit_amount: totalAmount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/booking-success',
        cancel_url: 'http://localhost:4242/cancel',
      });

      console.log("SESSIOn",session);
      res.send({ url: session.url })
    } catch (error) {
      console.log('STRIPE error',error);
    }
    console.log(req.body);
    bookingSchema.create({
      userId,
      bikeId,
      totalAmount,
      totalHours,
      needHelmet,
      bookedTimeSlots,
      location,
      stripeSessionId: session.id
    }).then((data) => {
      console.log("done",data);
    })

    console.log('Booking saved successfully');
        //   const booking = new bookingSchema({
        //     userId: userId,
        //     bikeId: bikeId,
        //     totalAmount: totalAmount,
        //     totalHours: totalHours,
        //     needHelmet: needHelmet,
        //     bookedTimeSlots: bookedTimeSlots,
        //     location : location,
        //     stripeSessionId: session.id // store the session id for future reference
        // });


        // save the booking object to the database
     try {
  //     await booking.save();
  //     console.log('Booking saved successfully');
          
          let bike = await bikeSchema.findOne({
            _id : bikeId
          })
          console.log(bike);
          if(bike.bookedTimeSlots) {
             //if the bookedSlots field exists, push a new value to the array
          bike.bookedTimeSlots.push(bookedTimeSlots)
        } else {
           // if the bookedSlots field doesn't exist, create a new field with an array of values
          bike.bookedTimeSlots = [bookedTimeSlots]
          }

            // save the updated bike document
        // bike.save((err, updatedBike) => {
        //   if (err) {
        //     console.error(err);
        //     return;
        //   }
      
        //   console.log('Updated bike:', updatedBike);
        // });
      

      // find the bike in the database and update its booking slot field
      //  bikeSchema.findById(bikeId,(err,bike) => {
      //   if(err) {
      //     console.log('ERRORRR',err);
      //     return
      //   }

      //   if(bike.bookedTimeSlots) {
      //     // if the bookedSlots field exists, push a new value to the array
      //     bike.bookedTimeSlots.push(bookedTimeSlots)
      //   } else {
      //      // if the bookedSlots field doesn't exist, create a new field with an array of values
      //     bike.bookedTimeSlots = [bookedTimeSlots]
      //   }

      //   // save the updated bike document
      //   bike.save((err, updatedBike) => {
      //     if (err) {
      //       console.error(err);
      //       return;
      //     }
      
      //     console.log('Updated bike:', updatedBike);
      //   });
      // })


      // const bike = await bikeSchema.findOneAndUpdate(
      //     { _id: bikeId },
      //     { $push: { bookedTimeSlots: bookedTimeSlots } },
      //     { new: true }
      // );

      // if the bike does not have any booking slots, create a new array and add the booking slot
      // if (!bike.bookedTimeSlots) {
      //     bike.bookedTimeSlots = [bookedTimeSlots];
      //     await bike.save();
      //     console.log('Booking slot created successfully');
      // }

      
  //     res.status(200).json({url: session.url})

  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
}
    
