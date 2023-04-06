const userSchema = require('../../Models/userSchema')
const bcrypt = require('bcrypt')
const generateToken = require('../../Utils/generateToken')
const shortid = require('shortid');

exports.signUpPost = async(req,res) => {
    console.log(req.body);
    try {
            let email = await userSchema.findOne({Email : req.body.Email})
            let mobile = await userSchema.findOne({Mobile : req.body.Mobile})
    
              let {
                Name,
                Email,
                Mobile,
                Password,
            } = req.body
    
            let details = {
                Name,
                Email,
                Mobile,
                Password,
                ReferalCode : shortid.generate()
            }
    
            if(email && mobile){
                res.status(401).json("Email and Mobile No already exists")
            } else if(email && !mobile){
                res.status(401).json("Email already exists")
            } else if(mobile && !email){
                res.status(401).json("Mobile No already Exists")
            } else {
                    console.log('referal',req.body);
                    console.log('referal',req.body.Referral);
               details.Password = await bcrypt.hash(details.Password,10)
                 
                userSchema.create(details).then((result) => {
                    let data = {
                        Name : result.Name,
                        Email : result.Email,
                        Mobile : result.Mobile,
                        ProfileImage : result.ProfileImage,
                        token :generateToken.generateToken(result._id),
                        Status : result.Status
                    }
                    if(req.body.Referral === ''){
                        console.log("sad");
                    } else {
                        userSchema.find({ReferalCode : req.body.Referral}).then((data) => {
                            console.log("got it",data);
                        })
                        .catch((err) => {
                            console.log("sorry",err);
                        })
                        console.log("happy");
                    }
                    res.status(200).json(data)
                })
            }
    } catch (error) {
        console.log("Signup Error",error);
        res.status(401).json("Signup Error")
        
    }
}