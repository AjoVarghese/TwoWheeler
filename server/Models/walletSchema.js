const mongoose = require("mongoose");
const moment = require("moment");

const walletSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    walletAmount: {
      type: Number,
    },
    walletHistory: {
      type: [
        {
          Type: {
            type: String,
          },
          amountAdded: {
            type: Number,
          },
          amountDeducted: {
            type: Number,
          },
          Date: {
            type: String,
            // default: moment().format("MMMM Do YYYY, h:mm:ss a"),
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Wallet", walletSchema);
module.exports = model;
