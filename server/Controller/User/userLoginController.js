const userSchema = require('../../Models/userSchema')
const bcrypt = require('bcrypt')
const generateToken = require('../../Utils/generateToken')

exports.LoginPost = async(req,res) => {
    console.log("LOGIN",req.body);
  try {
    let {Mobile,Password} = req.body

    let details = {
       Mobile,
       Password
    }

     userSchema.findOne({Mobile : details.Mobile}).then((data) => {
      console.log("DASAS",data);

      if(data){
        if(data.Status) {
          // let password = await bcrypt.compare(details.Password,data.Password)
          bcrypt.compare(details.Password,data.Password,(err,response) => {
            if(response){
              let {id,Name,Email,Mobile,Status,ProfileImage} = data
  
            let result = {
              id,
              Name,
              Email,
              Mobile,
              Status,
              ProfileImage,
              token : generateToken.generateToken(id)
            }
            console.log("LOGIN DETAILS",result);
            res.status(200).json(result)
            } else {
              console.log("INC PASS");
              res.status(400).json("Incorrect Password")
            }
          })
          
        } else {
          console.log("BLOCK");
          res.status(400).json("Your account has been suspended temporarily")
        }
      } else {
          console.log("Mobile Error");
          res.status(400).json("Mobile No doesn't exists")
      }
     })
     .catch((error) => {
      res.json(error)
  })
    
  } catch (error) {
    
  }
    
  
}