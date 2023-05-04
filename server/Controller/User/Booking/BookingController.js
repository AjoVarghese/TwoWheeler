const bookingSchema = require("../../../Models/bookingSchema");
const bikeSchema = require("../../../Models/vehicleSchema");
const walletSchema = require("../../../Models/walletSchema");
const couponSchema = require("../../../Models/couponSchema");
const userSchema = require("../../../Models/userSchema");
const moment = require("moment");
const dotenv = require("dotenv");
dotenv.config();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

//global_Variables

const COMPLETED = "Completed";
const CANCELLED = "Cancelled";

exports.bikeBookingController = async (req, res) => {
  const {
    user,
    userName,
    bikeId,
    bikeDetails,
    totalHours,
    totalAmount,
    needHelmet,
    bookedTimeSlots,
    location,
    paymentType,
    couponCode,
  } = req.body.bookingData;
  let session;

  //chcking user status
  let userData = await userSchema.findOne({ _id: user });
  try {
    let startingTime = bookedTimeSlots.startDate;
    let sTime = moment(startingTime,'MMMM Do YYYY, h:mm:ss a')
    let startTimeStamp = sTime.unix()
    let endingTime = bookedTimeSlots.endDate;
    let status = 'allowed';

    let check = await bikeSchema.findOne({ _id: bikeId });
    let isBooked = await bookingSchema.findOne({ bikeId: bikeId });

    let currentTime = moment().format("MMMM Do YYYY, h:mm:ss a");
    let currTime = moment(currentTime,'MMMM Do YYYY, h:mm:ss a')
    const currTimeStamp = currTime.unix();
    console.log('stamp',currTimeStamp);
    console.log('startstampe',startTimeStamp);
    // console.log("start",startingTime);
    // console.log("curre",currentTime);

    
    if (startTimeStamp< currTimeStamp) {
      res
        .status(400)
        .json("Selected Day or Date is less than current day or date");
    } else if (totalHours === 0) {
      res.status(400).json("Rent time should be min 1 hr");
    } else {
      for (let i = 0; i < check.BookedTimeSlots.length; i++) {
       console.log("start tme",check.BookedTimeSlots[i].startDate);
       console.log("end Time",check.BookedTimeSlots[i].endDate);

       let checkEnd = moment(check.BookedTimeSlots[i].endDate,'MMMM Do YYYY, h:mm:ss a')
       let checkTimeStamp = checkEnd.unix()

        if (  startTimeStamp > checkTimeStamp) {
          console.log("OKK");
          status = "allowed" ;
        } 
        else if (
          startTimeStamp &&
          startTimeStamp <= checkTimeStamp &&
          isBooked?.status !== COMPLETED &&
          isBooked?.status !== CANCELLED
        ) {
          console.log('set');
          status = "not allowed";
        }
      }
   console.log("status",status);
      //  date Status
      if (status === "allowed") {
        if (paymentType === "Stripe") {
          session = await stripe.checkout.sessions.create({
            line_items: [
              {
                price_data: {
                  currency: "inr",
                  product_data: {
                    name: bikeDetails.vehicleName,
                    images: [bikeDetails.Photo[0]],
                    description: bikeDetails.description,
                    metadata: {
                      bike_id: bikeId,
                      totalHours: totalHours,
                      needHelmet: needHelmet,
                      location: location,
                      startDate: bookedTimeSlots.startDate,
                      endDate: bookedTimeSlots.endDate,
                    },
                  },
                  unit_amount: totalAmount * 100,
                },
                quantity: 1,
              },
            ],
            mode: "payment",
            success_url: `https://twowheelerrent.netlify.app'/booking-success?userId=${user}
                        &userName=${userName}&bikeId=${bikeId}&bikeName=${bikeDetails.vehicleName}
                        &bikeModel=${bikeDetails.vehicleModel}&image=${bikeDetails.Photo[0]}
                        &totalAmount=${totalAmount}&totalHours=${totalHours}
                        &startDate=${bookedTimeSlots.startDate}&endDate=${bookedTimeSlots.endDate}
                        &location=${location}&needHelmet=${needHelmet}
                        &paymentType=${paymentType}&couponCode=${couponCode}`,
            cancel_url: "https://twowheelerrent.netlify.app/booking-cancelled",
          });

          res.status(200).json({
            url: session.url,
            bookingData: req.body,
            userData: userData,
          });
        } else {
          const booking = new bookingSchema({
            userId: user,
            bikeId: bikeId,
            totalAmount: totalAmount,
            totalHours: totalHours,
            needHelmet: needHelmet,
            bookedTimeSlots: bookedTimeSlots,
            location: location,
            status: "Booked",
            paymentType: paymentType,
            bookedAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
            // stripeSessionId: session.id // store the session id for future reference
          });

          try {
            await booking.save();

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
            console.log("user", user);

            walletSchema.findOne({ userId: user }).then((data) => {});

            walletSchema
              .updateOne(
                {
                  userId: user,
                },
                {
                  // $set : {
                  $inc: {
                    walletAmount: -totalAmount,
                  },
                  $push: {
                    walletHistory: {
                      Type: "Bike rented",
                      amountDeducted: totalAmount,
                    },
                  },
                  // }
                }
              )
              .then(async (response) => {
                let bikeData = await bikeSchema.findOne({
                  $and: [
                    {
                      _id: bikeId,
                    },
                    {
                      OwnerId: { $exists: true },
                    },
                  ],
                });

                if (bikeData) {
                  let walletExists = await walletSchema.findOne({
                    userId: bikeData.OwnerId,
                  });
                  let withoutCouponAmount;
                  let bookingAmount;
                  let price;

                  //checking if coupon applied
                  if (couponCode !== null) {
                    couponSchema
                      .findOne({
                        couponCode: couponCode,
                      })
                      .then((couponData) => {
                        price = couponData?.couponPrice;
                        withoutCouponAmount =
                          parseInt(totalAmount) + parseInt(price);
                        bookingAmount = withoutCouponAmount * 0.25;

                        if (!walletExists) {
                          const newWallet = {
                            userId: bikeData.OwnerId,
                            walletAmount: withoutCouponAmount * 0.25,
                            walletHistory: [
                              {
                                Type: "Bike rent Share",
                                amountAdded: withoutCouponAmount * 0.25,
                                Date : moment().format("MMMM Do YYYY, h:mm:ss a"),
                              },
                            ],
                          };

                          walletSchema.create(newWallet);
                        } else {
                          console.log("exists");
                          walletSchema
                            .updateOne(
                              {
                                userId: walletExists.userId,
                              },
                              {
                                $inc: {
                                  walletAmount: withoutCouponAmount * 0.25,
                                },
                                $push: {
                                  walletHistory: {
                                    Type: "Bike Rent Share",
                                    amountAdded: withoutCouponAmount * 0.25,
                                    Date : moment().format("MMMM Do YYYY, h:mm:ss a"),
                                  },
                                },
                              }
                            )
                            .then((response) => {});
                        }
                      });
                  } else if (couponCode === null) {
                    if (!walletExists) {
                      bookingAmount = totalAmount * 0.25;

                      const newWallet = {
                        userId: bikeData.OwnerId,
                        walletAmount: bookingAmount,
                        walletHistory: [
                          {
                            Type: "Bike rent Share",
                            amountAdded: bookingAmount,
                            Date : moment().format("MMMM Do YYYY, h:mm:ss a"),
                          },
                        ],
                      };

                      walletSchema.create(newWallet);
                    } else {
                      console.log("exists");
                      walletSchema
                        .updateOne(
                          {
                            userId: walletExists.userId,
                          },
                          {
                            $inc: {
                              walletAmount: totalAmount * 0.25,
                            },
                            $push: {
                              walletHistory: {
                                Type: "Bike Rent Share",
                                amountAdded: totalAmount * 0.25,
                                Date : moment().format("MMMM Do YYYY, h:mm:ss a"),
                              },
                            },
                          }
                        )
                        .then((response) => {});
                    }
                  }
                }

                res.status(200).json({ message: "Booking Successfull" });
              })
              .catch((err) => {});
          } catch (error) {}
        }
      } else if(status === 'not allowed') {
        res
          .status(400)
          .json(
            "Bike has been booked for the selected time..please change the time to book"
          );
      }
    }
  } catch (error) {
    console.log("Wallet error", error);
    res.status(400).json("Internal Server Error");
  }
};

//success-page
exports.createOrderController = async (req, res) => {
  try {
    const {
      userId,
      userName,
      bikeId,
      bikeName,
      bikeModel,
      image,
      totalAmount,
      totalHours,
      bookedTimeSlots,
      loc,
      needHelmet,
      paymentType,
      couponCode,
    } = req.body.bookingDetails;
    const booking = new bookingSchema({
      userId: userId,
      bikeId: bikeId,
      totalAmount: totalAmount,
      totalHours: totalHours,
      needHelmet: needHelmet,
      bookedTimeSlots: bookedTimeSlots,
      location: loc,
      status: "Booked",
      paymentType: paymentType,
      bookedAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
    });

    try {
      await booking.save();

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

      if (couponCode !== "null" && couponCode !== "") {
        couponSchema
          .updateOne(
            { couponCode: couponCode },
            {
              $push: {
                users: {
                  userId: userId,
                },
              },
            }
          )
          .then((response) => {});
      }

      //wallet setting
      let bikeData = await bikeSchema.findOne({
        $and: [
          {
            _id: bikeId,
          },
          {
            OwnerId: { $exists: true },
          },
        ],
      });

      if (bikeData) {
        let walletExists = await walletSchema.findOne({
          userId: bikeData.OwnerId,
        });
        let withoutCouponAmount;
        let bookingAmount;
        let price;

        //checking if coupon applied

        if (couponCode !== "null") {
          couponSchema
            .findOne({
              couponCode: couponCode,
            })
            .then((couponData) => {
              price = couponData.couponPrice;

              withoutCouponAmount = parseInt(totalAmount) + parseInt(price);

              bookingAmount = withoutCouponAmount * 0.25;
              if (!walletExists) {
                const newWallet = {
                  userId: bikeData.OwnerId,
                  walletAmount: withoutCouponAmount * 0.25,
                  walletHistory: [
                    {
                      Type: "Bike rent Share",
                      amountAdded: withoutCouponAmount * 0.25,
                    },
                  ],
                };

                walletSchema.create(newWallet);
              } else {
                walletSchema
                  .updateOne(
                    {
                      userId: walletExists.userId,
                    },
                    {
                      $inc: {
                        walletAmount: withoutCouponAmount * 0.25,
                      },
                      $push: {
                        walletHistory: {
                          Type: "Bike Rent Share",
                          amountAdded: withoutCouponAmount * 0.25,
                        },
                      },
                    }
                  )
                  .then((response) => {});
              }
            });
        } else if (couponCode === "null") {
          if (!walletExists) {
            bookingAmount = totalAmount * 0.25;

            const newWallet = {
              userId: bikeData.OwnerId,
              walletAmount: bookingAmount,
              walletHistory: [
                {
                  Type: "Bike rent Share",
                  amountAdded: bookingAmount,
                },
              ],
            };

            walletSchema.create(newWallet);
          } else {
            walletSchema
              .updateOne(
                {
                  userId: walletExists.userId,
                },
                {
                  $inc: {
                    walletAmount: totalAmount * 0.25,
                  },
                  $push: {
                    walletHistory: {
                      Type: "Bike Rent Share",
                      amountAdded: totalAmount * 0.25,
                    },
                  },
                }
              )
              .then((response) => {});
          }
        }
        //
      } else {
      }
    } catch (err) {
      res.status(500).send("Server error");
    }
  } catch (error) {
    res.status(400).json("Internal Server Error");
  }
};
