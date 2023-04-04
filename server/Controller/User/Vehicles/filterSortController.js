const vehicle = require('../../../Models/vehicleSchema')

exports.sortByNameAsc = (req,res) => {
    try {
        vehicle.find({Status : "Acccepted"}).sort({vehicleName: -1}).then((data) => {
            console.log("ASC",data);
            res.status(200).json(data)
        })
    } catch (error) {
        
    }
}

exports.sortByNameDesc = (req,res) => {
    try{
        vehicle.find({Status : "Acccepted"}).sort({vehcileName:-1}).then((data) => {
            console.log("DESC",data);
            res.status(200).json(data)
        })
    } catch (error) {
        
    }
}

exports.filterByPrice = (req,res) => {
   try {
      vehicle.find({
        "Status" : "Acccepted",
        "$and" : [
            {Price : {"$gte" : 100}},
            {Price : {"$lt" : 101}}
        ]
      }).then((data) => {
        res.status(200).json(data)
      })
   } catch (error) {
    
   }
}

// db.collection.find({
//     "status": "Accepted",
//     "$and": [
//       { "price": { "$gt": 100 } },
//       { "price": { "$lt": 200 } }
//     ]
//   })