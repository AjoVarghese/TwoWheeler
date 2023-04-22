const vehicleSchema = require('../../../Models/vehicleSchema')

exports.viewVehicles = async(req,res) => {
  console.log(req.query.id);
  console.log(req.query.page)
  // const itemsPerPage = 3
  // const page = req.query.page
  const itemsPerPage = 3
  const page = req.query.page || 1
  let pageCount
  let count
  let currentPage = parseInt(page)
  try {
    vehicleSchema.find({
      $and: [
        { Status: 'Acccepted' },
        {
          $or: [
            { OwnerId: { $ne: req.query.id } },
            { OwnerId: { $exists: false } }
          ]
        }
      ]
    })
    .skip((itemsPerPage * page) - itemsPerPage)
    .limit(itemsPerPage)
    .then((data) => {
      vehicleSchema.countDocuments({
        $and: [
          { Status: 'Acccepted' },
          {
            $or: [
              { OwnerId: { $ne: req.query.id } },
              { OwnerId: { $exists: false } }
            ]
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
        res.status(500).json({ message: 'Error occurred while fetching the count' })
      })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({ message: 'Error occurred while fetching the data' })
    })
  } catch (error) {
    console.log(error)
  }
}

exports.blabla = async(req,res) => {
  
  try {
     vehicleSchema.find(
      {Location : req.body.Location}
     ).sort({Price : 1}).then((data) => {
      res.status(200).json(data)
     })
  } catch (error) {
    
  }
}

//for Pagination
exports.getAllBikes = async(req,res) => {
  vehicleSchema.find({Status : "Acccepted"}).then(async(data) => {
    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.limit) || 2
    const skip = (page - 1) * pageSize

    const pages = Math.ceil(data.length / pageSize)

    data = data.skip(skip).limit(pageSize)
  })
  .catch((err) => {

  })
}