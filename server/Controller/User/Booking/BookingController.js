const bookingSchema = require('../../../Models/bookingSchema')
const bikeSchema = require('../../../Models/vehicleSchema')
const walletSchema = require('../../../Models/walletSchema')
const moment = require('moment')
const dotenv = require('dotenv')
dotenv.config()
const Stripe = require("stripe")
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)


exports.bikeBookingController = async(req,res) => {
   console.log(req.body.bookingData);
    const {user,userName,bikeId,bikeDetails,totalHours,totalAmount,needHelmet,bookedTimeSlots,location,paymentType,walletId} = req.body.bookingData
    console.log(paymentType);
    let session
    try {
      console.log('bookedTimeSlots',bookedTimeSlots.startDate);
      console.log('bookedTimeSlots',bookedTimeSlots.endDate);
      let startingTime = bookedTimeSlots.startDate
      let endingTime = bookedTimeSlots.endDate
      let status = true
      console.log(bookedTimeSlots.startDate <= bookedTimeSlots.endDate);
     let checkDate = await bikeSchema.findOne({_id :bikeId})
     for(let i = 0 ; i < checkDate.BookedTimeSlots.length ; i++){
      // console.log('startDate',checkDate.BookedTimeSlots[i].startDate);
      // console.log('endDate',checkDate.BookedTimeSlots[i].endDate);
      if(startingTime > checkDate.BookedTimeSlots[i].endDate){
        console.log(" allowed");
        status = true

      } else if(startingTime <=checkDate.BookedTimeSlots[i].endDate) {
        console.log('booking not allowed');
        status = false
      }
      console.log('status',status);
      console.log('-------------------');
     }

     //date Status
     if(status === true){
      console.log("book");
      if(paymentType === 'Stripe') {
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
          success_url: `http://localhost:3000/booking-success?userId=${user}
                        &userName=${userName}&bikeId=${bikeId}&bikeName=${bikeDetails.vehicleName}
                        &bikeModel=${bikeDetails.vehicleModel}&image=${bikeDetails.Photo[0]}
                        &totalAmount=${totalAmount}&totalHours=${totalHours}
                        &startDate=${bookedTimeSlots.startDate}&endDate=${bookedTimeSlots.endDate}
                        &location=${location}&needHelmet=${needHelmet}
                        &paymentType=${paymentType}`,
          cancel_url: 'http://localhost:3000/booking-cancelled',
        });
       
        res.status(200).json({url: session.url,bookingData : req.body })
      } else {
        console.log('wallet payment');
        const booking = new bookingSchema({
          userId: req.query.id,
          bikeId: bikeId,
          totalAmount: totalAmount,
          totalHours: totalHours,
          needHelmet: needHelmet,
          bookedTimeSlots: bookedTimeSlots,
          location : location,
          status : "Booked",
          paymentType : paymentType,
          bookedAt : moment().format('MMMM Do YYYY, h:mm:ss a'),
          // stripeSessionId: session.id // store the session id for future reference
      });

      try {
        await booking.save();
    console.log('Booking saved successfully');

    // find the bike in the database and update its booking slot field
    const bike = await bikeSchema.findOneAndUpdate(
        { _id: bikeId },
        { $push: { BookedTimeSlots: bookedTimeSlots } },
        { new: true }
    );

    // if the bike does not have any booking slots, create a new array and add the booking slot
    if (!bike.BookedTimeSlots) {
        bike.BookedTimeSlots = [bookedTimeSlots];
        await bike.save();  
    }

    //decrement Amount from wallet
     console.log('user',user);

     walletSchema.findOne({userId : user}).then((data) => {
      console.log('pppppp',data);
     })
    
    walletSchema.updateOne(
      {
        userId : user
      },
      {
        // $set : {
          $inc : {
            walletAmount : -totalAmount
          },
          $push : {
            walletHistory : {
              Type : "Bike rented",
              amountDeducted : totalAmount
            }
          }
        // }
      }
      ).then((response) => {
        console.log('wallet payment done',response);
      })
      .catch((err) => {
        console.log('wallet booking error',err);
      })
      // res.status(200).status({message : "Booking Confirmed"})
      } catch (error) {
        
      }
      }
     }
     else {
      console.log('booking not allowed');
      res.status(400).json("Bike has been booked for the selected time..please change the time to book")
     }
      
       
    } catch (error) {
      console.log('Wallet error',error);
    }

}



//success-page
exports.createOrderController = async(req,res) => {

  try {
    const {userId,userName,bikeId,bikeName,bikeModel,image,totalAmount,totalHours,bookedTimeSlots,loc,needHelmet,paymentType} = req.body.bookingDetails
    const booking = new bookingSchema({
      userId: userId,
      bikeId: bikeId,
      totalAmount: totalAmount,
      totalHours: totalHours,
      needHelmet: needHelmet,
      bookedTimeSlots: bookedTimeSlots,
      location : loc,
      status : "Booked",
      paymentType : paymentType,
      bookedAt : moment().format('MMMM Do YYYY, h:mm:ss a'),
      // stripeSessionId: session.id // store the session id for future reference
  });

  try {
    await booking.save();
    console.log('Booking saved successfully');

    // find the bike in the database and update its booking slot field
    const bike = await bikeSchema.findOneAndUpdate(
        { _id: bikeId },
        { $push: { BookedTimeSlots: bookedTimeSlots } },
        { new: true }
    );

    // if the bike does not have any booking slots, create a new array and add the booking slot
    if (!bike.BookedTimeSlots) {
        bike.BookedTimeSlots = [bookedTimeSlots];
        await bike.save();
        
    }

    //wallet setting
    let bikeData = await bikeSchema.findOne({
      $and : [
        {
          _id : bikeId
        },
        {
          OwnerId : {$exists : true}
        }
      ]
    })

    if(bikeData){
      let walletExists = await walletSchema.findOne({userId : bikeData.OwnerId})

      if(!walletExists){
        console.log('null');
        const newWallet = {
          userId : bikeData.OwnerId,
          walletAmount : 100,
          walletHistory : [
            {
              Type : "Bike rent",
              Amount : 100
            }
          ]
        }

        walletSchema.create(newWallet)
      } else {
        console.log('exists');
        walletSchema.updateOne({
          userId : walletExists.userId
        },
          {
            $inc : {
              walletAmount : 300
            },
            $push : {
              walletHistory : {
                Type : "Bike Rent",
                Amount : 300
              }
            }
          }
        ).then((response) => {
          console.log("response",response);
        })
      }
    }else {
      console.log("NOTHING");
    }
    

} catch (err) {
    console.log('fffffffff',err);;
    res.status(500).send('Server error');
}
  } catch (error) {
    
  }
  

}
    
