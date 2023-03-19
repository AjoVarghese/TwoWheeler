const adminSchema = require('../../Models/adminSchema')
const bcrypt = require('bcrypt')
const generateToken = require('../../Utils/generateToken')


exports.adminLoginPost = async(req,res) => {
    console.log("ADMIN LOGIN",req.body);
    try {
        let {Email,Password} = req.body
        let details = {Email,Password}
        // console.log("ADMIN DETAILS",details);
         adminSchema.findOne({Email : details.Email}).then((data) => {
            // console.log("AD DATA",data);
            if(data){
              bcrypt.compare(details.Password,data.Password,(err,response) => {
                if(response){
                    console.log("ADMIN LOGIN SUCCESS",response);
                    let result = {
                        Email : data.Email,
                        token : generateToken.generateToken(data._id)
                    }
                    res.status(200).json(result)
                } else {
                    console.log("ADMIN INC PASS",err);
                    res.status(400).json("Incorrect Password")
                }
              })
            } else {
                console.log("EMAIL ERROR");
                res.status(400).json("Email doesn't exists")
            }
         })
        .catch((error) => {
            console.log("ADMIN LOGIN ERROR",error);
            res.status(400).json(error)
        })
    } catch (error) {
        
    }
}