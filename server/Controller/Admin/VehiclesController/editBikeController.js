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


exports.EditVehicle = async(req,res) => {
    console.log("IDDD",req.query.id);
     console.log("VEHICLE",req.body);
     console.log("images",req.files);
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
    //  let details = {
    //   // OwnerName : req.body.OwnerName,
    //   vehicleName : req.body.bikeName,
    //   vehicleModel : req.body.bikeModel,
    //   Brand : req.body.brand,
    //   Fuel : req.body.fuel,
    //   EngineNo : req.body.engineNo,
    //   Color : req.body.color,
    //   Description : req.body.desc,
    //   Price : req.body.price,
    //   Assured : true,
    //   Status : "Acccepted",
    //   Photo,
    //  }

    //   vehicleSchema.create(details).then((data) => {
    //      console.log("VEHICLE DATA : ",data);
    //      res.status(200).json(data)
    //   } )

    vehicleSchema.updateOne({_id : req.query.id},
        {
            $set:{
                vehicleName : req.body.bikeName,
                vehicleModel : req.body.bikeModel,
                Brand : req.body.brand,
                Fuel : req.body.fuel,
                EngineNo : req.body.engineNo,
                Color : req.body.color,
                Description : req.body.desc,
                Price : req.body.price,
                Photo
            }
        }).then(() => {
            vehicleSchema.findOne({_id : req.query.id}).then((data) => {
                console.log("Edited data",data);
                res.status(200).json(data)
            })
        })
  
    } else {
      res.status(405).json({
        err: `${req.method} method not allowed`
      })
    }
  } catch (error) {
    console.log("ERROR",error);
    res.status(400).json("Error Occured",error)
  }
}