const Location = require('../../../Models/locationSchema')

exports.addLocation = async(req,res) => {
    try {
        console.log("Location",req.body);
        let location={
            Location : req.body.location
        }
        Location.create(location).then(() => {
            
            Location.find().then((data) => {
              res.status(200).json(data)
            })
        })
    } catch (error) {
        console.log("Locatin Error",error);
        res.status(200).json(error)
    }
}


exports.editLocation = async(req,res) => {
    try {
        Location.updateOne({_id : req.query.id},
            {
                $set : {Location : req.body.Location}
            }
        ).then(()=> {
            Location.findOne({_id : req.query.id}).then((data) => {
              console.log("updated location",data);
              res.status(200).json(data)
            })
        })
            

    } catch (error) {
        
    }
}

exports.getLocation = async(req,res) => {
    try {
        Location.find().then((data) => {
            console.log("locations",data);
            res.status(200).json(data)
        })
    } catch (error) {
        
    }
}

exports.deleteLocation = async(req,res) => {
    try {
        Location.deleteOne({_id : req.query.id}).then(() => {
            Location.find().then((data) => {
                console.log("after deletinf",data);
                res.status(200).json(data)
            })
        })
    } catch (error) {
        
    }
}