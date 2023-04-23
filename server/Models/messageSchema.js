const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
//     chatId : {
//         type : String
//     },
//     senderId : {
//         type : String
//     },
//     text : {
//         type : String
//     },
// },
//     {
//         timestamps : true,
//     }
   ChatUsers : {
    type : Array,
    required : true
   },
   message : {
    type : String,
    required : true
   },
   Sender : {
    type : mongoose.Schema.Types.ObjectId,
    required : true
   }
   },{timestamps:true}
   )


const model = mongoose.model("message", messageSchema);
module.exports = model;