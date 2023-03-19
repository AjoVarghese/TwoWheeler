// const multer = require('multer')
const path = require('path')
const fs = require('fs')
const cloudinary = require('../../../Utils/Cloudinary')
const upload = require('../../../Utils/multer')

const vehicleSchema = require('../../../Models/vehicleSchema')


// const storage = multer.diskStorage({
//   destination : path.join(__dirname , '../../../public/Images'),
//   filename : function (req , file , cb) {
//     cb(null , file.originalname)
//   }
// })


exports.addVehicle = async(req,res) => {
     console.log("VEHICLE",req.body);
  try {
    const uploader = async (path) => await cloudinary.uploads(path, 'Images');

    if (req.method === 'POST') {
      const urls = []
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path)
        urls.push(newPath)
        fs.unlinkSync(path)
      }
  
      console.log("URLS",urls);
      
    //  let {BikeName,BikeModel,Brand,Fuel,EngineNo,Color,Description,Price} = req.body

    let Photo = [];

    for(let i = 0 ; i < urls.length; i++){
      Photo.push(urls[i].url)
    }
     let details = {
      OwnerName : req.body.OwnerName,
      vehicleName : req.body.BikeName,
      vehicleModel : req.body.BikeModel,
      Brand : req.body.Brand,
      Fuel : req.body.Fuel,
      EngineNo : req.body.EngineNo,
      Color : req.body.Color,
      Description : req.body.Description,
      Price : req.body.Price,
      Photo
     }

      vehicleSchema.create(details).then((data) => {
         console.log("VEHICLE DATA : ",data);
         res.status(200).json(data)
      } )
  
    } else {
      // res.status(405).json({
      //   err: `${req.method} method not allowed`
      // })
    }
  } catch (error) {
    // console.log("ERROR",error);
    // res.status(400).json("Error Occured",error)
  }
}