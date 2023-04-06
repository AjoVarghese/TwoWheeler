const userSchema = require('../../Models/userSchema')
const bcrypt = require('bcrypt')
const generateToken = require('../../Utils/generateToken')
const axios = require('axios')

exports.LoginPost = async(req,res) => {
    console.log("LOGIN",req.body);
    if(req.body.googleAccessToken){
      axios.get("https://www.googleapis.com/oauth2/v3/userinfo",{
                headers : {
                    "Authorization" : `Bearer ${req.body.googleAccessToken}`
                }
             }).then(async(response) => {
              const Email = response.data.email

              const alreadyExistUser  = await userSchema.findOne({Email})

              if(!alreadyExistUser){
                console.log("User don't exists");
                return res.status(400).json({message : "User don't exists"})
              }
              const token = generateToken(alreadyExistUser._id)
               console.log("TOken",token);
                res.status(200).json({alreadyExistUser,token})
             })
    } else {

    }
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

exports.otpLoginPost = (req,res) => {
  console.log("mobile",req.body);
  try {
    userSchema.findOne({Mobile : req.body.mobile}).then((data) => {
      if(data){
        if(data.Status){
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
          console.log("BLOCK");
          res.status(400).json("Your account has been suspended temporarily")
        }
      } else {
        console.log("Mobile Error");
        res.status(400).json("Mobile No doesn't exists")
      }
    })
    .catch((err) => {
      res.json(error)
    })
  } catch (error) {
    
  }
}

exports.googleSignup = (req,res) => {
  console.log(req.body);
  try {
    userSchema.findOne(
      {
        Email : req.body.Email
      }
    ).then((userExists) => {
      if(userExists) {
        if(userExists.Status) {
          const userDetails = {
            id : userExists._id,
            Name : userExists.Name,
            Email : userExists.Email,
            Mobile : userExists.Mobile ,
            token : generateToken.generateToken(userExists._id)
          }
          console.log('already existing user login');
          res.status(200).json(userDetails)
        } else {
          res.status(401).json("Account is Suspended")
        }
      } else {
        console.log('req.body in the crea user side',req.body);

        const userDetails = {
          Name : req.body.Name,
          Email : req.body.Email,
          Mobile : req.body.Phone,
          ProfileImage : req.body.Photo,
          isGoogle : true
        }
        userSchema.create(userDetails).then((data) => {
          console.log("created data",data);
          const details = {
            Name : data.Name,
            Email : data.Email,
            Mobile : data.Mobile,
            ProfileImage : data.ProfileImage,
            token : generateToken.generateToken(data._id),
            isGoogle : true
          }
          res.status(200).json(details)
        })
        .catch((err) => {
          console.log('error in google with signup create',err);
          res.status(400).json("error while creating user with google !!!")
        })
      }
    })
  } catch (error) {
    
  }
}