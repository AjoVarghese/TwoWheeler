const vehicle = require('../../../Models/vehicleSchema')

exports.searchBikes = (req,res) => {
    try {
        console.log("search bike",req.body);
        vehicle.find({$and:[{vehicleName : 
            {$regex : req.body.searchTerm,$options : 'i'}},
            {Status : "Acccepted"}
        ]}).then((data) => {
            res.status(200).json(data)
        })
        
        // vehicle.find({vehicleName : {$regex : req.body.searchTerm,$options : 'i'}}
        // &&{ Status : "Acccepted"} ).then((data) =>{
        //     console.log("Search result",data);
        //     
        // })
    } catch (error) {
        
    }
}