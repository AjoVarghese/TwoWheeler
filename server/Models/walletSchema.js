const mongoose = require('mongoose')
const moment = require('moment')

const walletSchema = new mongoose.Schema({
    userId : {
        type : String
    },
    walletAmount : {
        type : Number
    },
    walletHistory : {
        type : [
            {
                Type : {
                    type : String
                },
                Amount : {
                    type : Number
                },
                Date : {
                    type :String,
                    default : moment().format('MMMM Do YYYY, h:mm:ss a')
                   
                }
            }
        ]
    }

})

const model = mongoose.model("Wallet",walletSchema)
module.exports = model