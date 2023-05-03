const path = require("path");
const fs = require("fs");
const cloudinary = require("../../../Utils/Cloudinary");
const upload = require("../../../Utils/multer");

const vehicleSchema = require("../../../Models/vehicleSchema");

// const storage = multer.diskStorage({
//   destination : path.join(__dirname , '../../../public/Images'),
//   filename : function (req , file , cb) {
//     cb(null , file.originalname)
//   }
// })

exports.EditVehicle = async (req, res) => {
 
  const uploader = async (path) => await cloudinary.uploads(path, "Images");

  if (req.method === "POST") {
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    if (urls.length > 0) {
     
      let Photo = [];
      for (let i = 0; i < urls.length; i++) {
        Photo.push(urls[i].url);
      }
    
      vehicleSchema
        .updateOne(
          { _id: req.query.id },
          {
            $set: {
              vehicleName: req.body.bikeName,
              vehicleModel: req.body.bikeModel,
              Brand: req.body.brand,
              Fuel: req.body.fuel,
              EngineNo: req.body.engineNo,
              Color: req.body.color,
              Description: req.body.desc,
              Price: req.body.price,
              Location: req.body.location,
              Photo,
            },
          }
        )
        .then((data) => {
      
          vehicleSchema.findOne({ _id: req.query.id }).then((data) => {
            res.status(200).json(data);
          });
        });
    } else {
      let newURLS = req.body.imageUrl.split(",");

      vehicleSchema
        .updateOne(
          { _id: req.query.id },
          {
            $set: {
              vehicleName: req.body.bikeName,
              vehicleModel: req.body.bikeModel,
              Brand: req.body.brand,
              Fuel: req.body.fuel,
              EngineNo: req.body.engineNo,
              Color: req.body.color,
              Description: req.body.desc,
              Price: req.body.price,
              Location: req.body.location,
              Photo: newURLS,
            },
          }
        )
        .then((data) => {
          vehicleSchema.findOne({ _id: req.query.id }).then((data) => {
            res.status(200).json(data);
          });
        });
    }
  }
};
