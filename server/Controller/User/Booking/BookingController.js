const bookingSchema = require('../../../Models/bookingSchema')
const bikeSchema = require('../../../Models/vehicleSchema')
const walletSchema = require('../../../Models/walletSchema')
const couponSchema = require('../../../Models/couponSchema')
const moment = require('moment')
const dotenv = require('dotenv')
dotenv.config()
const Stripe = require("stripe")
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)


exports.bikeBookingController = async(req,res) => {
   console.log(req.body.bookingData);
    const {user,userName,bikeId,bikeDetails,totalHours,totalAmount,needHelmet,bookedTimeSlots,location,paymentType,couponCode} = req.body.bookingData
    console.log(paymentType);
    console.log(couponCode);
    let session

    try {
      
      let startingTime = bookedTimeSlots.startDate
      let endingTime = bookedTimeSlots.endDate
      let status = true
      
     let checkDate = await bikeSchema.findOne({_id :bikeId})
     
     for(let i = 0 ; i < checkDate.BookedTimeSlots.length ; i++){
     
      if( startingTime > checkDate.BookedTimeSlots[i].endDate){
        console.log(" allowed");
        status = true
      } else if(startingTime && startingTime <=checkDate.BookedTimeSlots[i].endDate ) {
        console.log('booking not allowed');
        status = false
      }
      
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
                        &paymentType=${paymentType}&couponCode=${couponCode}`,
          cancel_url: 'http://localhost:3000/booking-cancelled',
        });
       
        res.status(200).json({url: session.url,bookingData : req.body })
      } else {
        console.log('wallet payment');
        const booking = new bookingSchema({
          userId: user,
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
      ).then(async(response) => {
        console.log('wallet payment done',response);

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

        if(bikeData) {
          let walletExists = await walletSchema.findOne({userId : bikeData.OwnerId})
          let bookingAmount 

          if(!walletExists){
            bookingAmount = totalAmount * 0.25
            console.log('null');
            const newWallet = {
              userId : bikeData.OwnerId,
              walletAmount : bookingAmount,
              walletHistory : [
                {
                  Type : "Bike rent Share",
                  amountAdded : bookingAmount
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
                  walletAmount : bookingAmount
                },
                $push : {
                  walletHistory : {
                    Type : "Bike Rent Share",
                    amountAdded : bookingAmount
                  }
                }
              }
            ).then((response) => {
              console.log("response",response);
            })
          }
        }
        
        res.status(200).json({message : 'Booking Successfull'})
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
    const {userId,userName,bikeId,bikeName,bikeModel,image,totalAmount,totalHours,bookedTimeSlots,loc,needHelmet,paymentType,couponCode} = req.body.bookingDetails
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
    //setting userId to coupon
    //checking coupon 
    if(couponCode !== null && couponCode !== ''){
      // let findUser = couponSchema.findOne({users : userId})
      couponSchema.updateOne(
        {couponCode : couponCode},
        {
          $push : {
            users : {
              userId : userId
            }
          }
        }
        ).then((response) => {
          console.log(response);
        })
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
      let withoutCouponAmount
      let bookingAmount 
      let price

      //checking if coupon applied
      console.log('COUPON CODE0',couponCode);
     if(couponCode !== null){
      console.log('isCOuponAPplied',couponCode);
      couponSchema.findOne({
        couponCode : couponCode
      }).then((couponData) => {
        console.log(couponData)
        price = couponData.couponPrice
        console.log("PRICE",couponData.couponPrice);
        console.log(totalAmount);
        withoutCouponAmount = parseInt(totalAmount) + parseInt(price)
        console.log('withoutCoupon',withoutCouponAmount);
        bookingAmount = withoutCouponAmount * 0.25
        if(!walletExists){
        
          console.log('null');
          const newWallet = {
            userId : bikeData.OwnerId,
            walletAmount : bookingAmount,
            walletHistory : [
              {
                Type : "Bike rent Share",
                amountAdded : bookingAmount
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
                walletAmount : bookingAmount
              },
              $push : {
                walletHistory : {
                  Type : "Bike Rent Share",
                  amountAdded : bookingAmount
                }
              }
            }
          ).then((response) => {
            console.log("response",response);
          })
        }
      })
     } else if(couponCode === null) {
      console.log('no coupon');
      if(!walletExists){
        bookingAmount = totalAmount * 0.25
        console.log('null');
        const newWallet = {
          userId : bikeData.OwnerId,
          walletAmount : bookingAmount,
          walletHistory : [
            {
              Type : "Bike rent Share",
              amountAdded : bookingAmount
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
              walletAmount : bookingAmount
            },
            $push : {
              walletHistory : {
                Type : "Bike Rent Share",
                amountAdded : bookingAmount
              }
            }
          }
        ).then((response) => {
          console.log("response",response);
        })
      }

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
    