const vehicle = require('../../../Models/vehicleSchema')

exports.filterBikes = (req,res) => {
    const itemsPerPage = 3;
    const page = req.query.page || 1;
    let pageCount;
    let currentPage = parseInt(page);
    console.log("filter",req.body);
    const {location,brand} = req.body
    try {
        if(location !== null && brand === null){
            console.log("LOCATION");
            console.log(page);
            try {
                vehicle.find(
                    {
                        $and : [
                            {
                                Location : location
                            },
                            {
                                Status : "Acccepted"
                            }
                        ]
                    }
                )
                .skip((itemsPerPage * page) - itemsPerPage)
      .limit(itemsPerPage)
      .then((data) => {
        vehicle.countDocuments({
          $and: [
            {
                Location : location
            },
            { Status: 'Acccepted' },
            // {
            //   $or: [
            //     { OwnerId: { $ne: req.query.id } },
            //     { OwnerId: { $exists: false } }
            //   ]
            // }
          ]
        })
        .then((count) => {
            pageCount = Math.ceil(count / itemsPerPage)
            const response = {
              data: data,
              pagination: {
                count: count,
                pageCount: pageCount,
                currentPage : currentPage
              }
            }
            
            res.status(200).json(response)
          })
          .catch((error) => {
            console.log(error)
            res.status(500).json({ message: 'Error occurred while fetching the count in search bikes' })
          })
        })
        .catch((error) => {
          console.log(error)
          res.status(500).json({ message: 'Error occurred while fetching the data in search bikes' })
        })
                // .then((data) => {
                //     res.status(200).json(data)
                // })
            } catch (error) {
                console.log("ERROR in filter by loaction",error);
            }
            
        } else if(location === null && brand !== null){
            console.log("BRAND");
            try {
                vehicle.find(
                    {
                        $and : [
                            {
                                Brand : {$regex : brand , $options : "i"}
                            },
                            {
                                Status : "Acccepted"
                            }
                            
                        ]
                    }
                )
                .skip((itemsPerPage * page) - itemsPerPage)
                .limit(itemsPerPage)
                .then((data) => {
                  vehicle.countDocuments({
                    $and: [
                        {
                            Brand : {$regex : brand , $options : "i"}
                        },
                        {
                            Status : "Acccepted"
                        }
                      // {
                      //   $or: [
                      //     { OwnerId: { $ne: req.query.id } },
                      //     { OwnerId: { $exists: false } }
                      //   ]
                      // }
                    ]
                  })
                  .then((count) => {
                      pageCount = Math.ceil(count / itemsPerPage)
                      const response = {
                        data: data,
                        pagination: {
                          count: count,
                          pageCount: pageCount,
                          currentPage : currentPage
                        }
                      }
                      
                      res.status(200).json(response)
                    })
                    .catch((error) => {
                      console.log(error)
                      res.status(500).json({ message: 'Error occurred while fetching the count in search bikes' })
                    })
                  })
                  .catch((error) => {
                    console.log(error)
                    res.status(500).json({ message: 'Error occurred while fetching the data in search bikes' })
                  })
                // .then((data) => {
                //     res.status(200).json(data)
                // })
            } catch (error) {
                console.log("Error in filter by brand",error);
            }
            
        } else if(location !== null && brand !== null){
            console.log("not bull");
            try {
                vehicle.find({
                    // $and : [
                    //   {
                        $and : [
                            {
                                Location : location
                            },
                            {
                                Brand : {$regex : brand , $options : 'i'}
                            },
                            {
                                Status : "Acccepted"
                              }
                        ]
                      
                      
                    // ]
                })
                .skip((itemsPerPage * page) - itemsPerPage)
                .limit(itemsPerPage)
                .then((data) => {
                  vehicle.countDocuments({
                    $and : [
                        {
                            Location : location
                        },
                        {
                            Brand : {$regex : brand , $options : 'i'}
                        },
                        {
                            Status : "Acccepted"
                          }
                    ]
                     
                  })
                  .then((count) => {
                      pageCount = Math.ceil(count / itemsPerPage)
                      const response = {
                        data: data,
                        pagination: {
                          count: count,
                          pageCount: pageCount,
                          currentPage : currentPage
                        }
                      }
                      
                      res.status(200).json(response)
                    })
                    .catch((error) => {
                      console.log(error)
                      res.status(500).json({ message: 'Error occurred while fetching the count in search bikes' })
                    })
                  })
                  .catch((error) => {
                    console.log(error)
                    res.status(500).json({ message: 'Error occurred while fetching the data in search bikes' })
                  })
                // .then((data) => {
                //     res.status(200).json(data)
                // })
            } catch (error) {
                console.log("error in filter by loca and brand",error);
            }
        }
        
    } catch (error) {
        
    }
}

