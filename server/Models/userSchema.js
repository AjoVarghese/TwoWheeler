const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    Name : {type : String , required : true},
    Email : {type : String , required : true},
    Mobile : {type : Number , required : true},
    Password : {type : String,required : true},
    Status : {type : Boolean,default : true,required : true},
    ProfileImage : {type : String ,
        default : "https://d36g7qg6pk2cm7.cloudfront.net/assets/profile-f17aa1dfbd0cb562142f1dcb10bb7ad33e1ac8417ad29a1cdab7dfbfbbfe2f15.png",
        required : true
    }

})

const model = mongoose.model("User",userSchema)

module.exports = model