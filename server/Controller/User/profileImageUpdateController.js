const userSchema = require('../../Models/userSchema');
const { generateToken } = require('../../Utils/generateToken');

exports.profileImageUploadPost = async(req,res) => {
    console.log("Image user id",req.query.id);
    console.log("IMAGE",req.body);
    // let userId = req.query.id
    let id = req.query.id
    let photo = req.body.image
    try {
        userSchema.updateOne({_id : id},
            {
                $set : {ProfileImage : photo}
            }).then((result) => {
                // console.log("RESULT",result);
                userSchema.findOne({_id : id}).then((data) => {
                    // console.log("DATAAADAD",data);
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

                      console.log("RESULTTE",result);
                    res.status(200).json(result)
                })
                
            })
    } catch (error) {
        console.log("ERROR",error);
    }
}