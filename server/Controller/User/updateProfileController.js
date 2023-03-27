const User = require('../../Models/userSchema')
const { generateToken } = require('../../Utils/generateToken')
exports.updateProfile = async(req,res) => {
    console.log(req.body)
    console.log(req.query.id)
    User.updateMany({_id : req.query.id},
        {
            $set:{
                Name : req.body.name,
                Email : req.body.email,
                Mobile : req.body.mobile
            }
        }).then(() => {
            User.findOne({_id : req.query.id}).then((data) => {
                console.log("Updated data",data);
                let {id,Name,Email,Mobile,Status,ProfileImage} = data
                let result = {
                    id,
                    Name,
                    Email,
                    Mobile,
                    Status,
                    ProfileImage,
                    token : generateToken(id)
                  }

                  console.log("RESULTT",result);
                   res.status(200).json(result)
            })
        })
  
}