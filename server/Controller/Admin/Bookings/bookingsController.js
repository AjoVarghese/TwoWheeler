const booking = require("../../../Models/bookingSchema");
const moment = require("moment");

exports.getBookedDetails = async (req, res) => {
  try {
    let data = await booking.aggregate([
      {
        $lookup: {
          from: "vehicles",
          localField: "bikeId",
          foreignField: "_id",
          as: "result",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "res",
        },
      },
      {
        $project: {
          bikeData: {
            $arrayElemAt: ["$result", 0],
          },
          userData: {
            $arrayElemAt: ["$res", 0],
          },
          totalHours: 1,
          totalAmount: 1,
          status: 1,
          needHelmet: 1,
          startingTime: "$bookedTimeSlots.startDate",
          endingTime: "$bookedTimeSlots.endDate",
        },
      },
      {
        $project: {
          userName: "$userData.Name",
          bikeName: "$bikeData.vehicleName",
          bikeModel: "$bikeData.vehicleModel",
          location: "$bikeData.Location",
          photo: "$bikeData.Photo",
          startingTime: 1,
          endingTime: 1,
          totalHours: 1,
          totalAmount: 1,
          status: 1,
        },
      },
    ]);

    let currentTime = moment().format("MMMM Do YYYY, h:mm:ss a");
    // let currTime = moment(currentTime, "MMMM Do YYYY, h:mm:ss a").unix();

    for (let i = 0; i < data.length; i++) {
      // let startTime = moment(
      //   data[i].startingTime,
      //   "MMMM Do YYYY, h:mm:ss a"
      // )
      // let endTime = moment(
      //   data[i].endingTime,
      //   "MMMM Do YYYY, h:mm:ss a"
      // )
      let startTime = data[i].startingTime
      let endTime = data[i].endingTime
       
      console.log("startTime",startTime);
      console.log("endTime",endTime);
      console.log("currTime",currentTime);
      if(currentTime <= endTime){
        console.log('true');
      } else {
        console.log('false');
      }
      if (currentTime > endTime && data[i].status !== "Completed") {
        booking
          .findOneAndUpdate(
            {
              _id: data[i]._id,
            },
            {
              $set: {
                status: "Time Exceeded",
              },
            }
          )
          .then((response) => {
            // res.status(200).json(response)
          });
      } else if (currentTime < startTime && data[i].status !== "Cancelled") {
        booking
          .findOneAndUpdate(
            {
              _id: data[i]._id,
            },
            {
              $set: {
                status: "Booked",
              },
            }
          )
          .then((resp) => {
              // res.status(200).json(resp)
          });
      } else if (
        currentTime >= startTime &&
        currentTime <= endTime &&
        data[i].status !== "Completed"
        // data[i].status === 'Booked'
      ) {
        booking
          .findOneAndUpdate(
            {
              _id: data[i]._id,
            },
            {
              $set: {
                status: "onRide",
              },
            }
          )
          .then((result) => {
            // res.status(200).json(result)
          });
      }
    }
    res.status(200).json(data);
  } catch (error) {}
};
