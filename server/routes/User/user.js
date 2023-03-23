var express = require('express');
var router = express.Router();
const upload = require('../../Utils/multer')

const signupController = require('../../Controller/User/userRegisterController')
const loginController = require('../../Controller/User/userLoginController')
const profilerImageUpdateController = require('../../Controller/User/profileImageUpdateController')
const viewVehiclesController = require('../../Controller/User/Vehicles/VehicleStoreController')
const userProfileController = require('../../Controller/User/getUserProfileController')
const addVehicleController = require('../../Controller/User/Vehicles/addVehicle')
const {protect} = require('../../middleware/jwtAuth')

// router.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "*");
//     res.header("Access-Control-Allow-Headers", "*");
//     next();});

/* GET home page. */
router.post('/signup',signupController.signUpPost)

router.post('/login',loginController.LoginPost)

router.get('/')

router.route('/profile').get(protect,userProfileController.getUserProfile)

router.route('/profileImageUpdate').post(protect,profilerImageUpdateController.profileImageUploadPost)

// router.post('/profileImageUpdate',profilerImageUpdateController.profileImageUploadPost)

router.route('/bikes').get(viewVehiclesController.viewVehicles)

router.route('/rent-bikes').post(protect,upload.array('images'),addVehicleController.addVehicle)

module.exports = router;
