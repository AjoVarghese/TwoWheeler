const location = require('../../../Models/locationSchema')

exports.addLocation = async(req,res) => {
    try {
        console.log("Location",req.body);
        location.create(req.body).then((data) => {
            console.log("Locatin set",data);
            res.status(200).json(data)
        })
    } catch (error) {
        console.log("Locatin Error",error);
        res.status(200).json(error)
    }
}


exports.editLocation = async(req,res) => {
    try {
        location.updateOne({_id : req.query.id},
            {
                $set : {Location : req.body.Location}
            }
        ).then(()=> {
            location.findOne({_id : req.query.id}).then((data) => {
              console.log("updated location",data);
              res.status(200).json(data)
            })
        })
            

    } catch (error) {
        
    }
}