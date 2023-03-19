const userSchema = require('../../Models/userSchema')
const bcrypt = require('bcrypt')
const generateToken = require('../../Utils/generateToken')

// require('dotenv').config()
// console.log(process.env.TOKEN_CODE);

exports.signUpPost = async(req,res) => {
    // console.log("SignData",req.body);
    try {
        

        let email = await userSchema.findOne({Email : req.body.Email})
        let mobile = await userSchema.findOne({Mobile : req.body.Mobile})

        // console.log("EEE",email);
        // console.log("MMM",mobile);

          let {
            Name,
            Email,
            Mobile,
            Password
        } = req.body

        let details = {
            Name,
            Email,
            Mobile,
            Password
        }

        if(email && mobile){
            console.log("1111");
            res.status(401).json("Email and Mobile No already exists")
        } else if(email && !mobile){
            console.log("222222");
            res.status(401).json("Email already exists")
        } else if(mobile && !email){
            console.log("33333");
            res.status(401).json("Mobile No already Exists")
        } else {
           console.log("SUCESSs");
           console.log(details);

           details.Password = await bcrypt.hash(details.Password,10)
           console.log("bcrypr",details.Password);

            userSchema.create(details).then((result) => {
                console.log("RESUKT",result);
                let data = {
                    Name : result.Name,
                    Email : result.Email,
                    Mobile : result.Mobile,
                    ProfileImage : result.ProfileImage,
                    token :generateToken.generateToken(result._id),
                    Status : result.Status
                }
                console.log("DDAAA",data);
                res.status(200).json(data)
            })
        }
    } catch (error) {
        console.log("Signup Error",error);
        res.status(401).json("Signup Error")
        
    }
}