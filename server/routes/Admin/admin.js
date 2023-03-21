var express = require('express');
var router = express.Router();
const upload = require('../../Utils/multer')

/* GET users listing. */
const adminSignup = require('../../Controller/Admin/adminSignupController')
const adminLogin = require('../../Controller/Admin/adminLoginController')
// const adminDashboardController = require('../../Controller/Admin/adminDashBoardController')
const userController = require('../../Controller/Admin/userController')
const blockUnblockController = require('../../Controller/Admin/adminUserBlockUnblock')
const addVehicleController = require('../../Controller/Admin/VehiclesController/adminAddVehicleController')
const viewVehiclesController = require('../../Controller/Admin/VehiclesController/adminViewVehiclesController')

const {protect} = require('../../middleware/jwtAuth')


router.post('/signup',adminSignup.adminSignupPost)

router.post('/login',adminLogin.adminLoginPost)

// router.get('/admin_dashboard',adminDashboardController.getUserDetails)

router.route('/users').get(protect,userController.getUserDetails)

router.route('/blockUnblock').get(protect,blockUnblockController.userBlockUnBlockPost)

// router.post('/blockUnblock',blockUnblockController.userBlockUnBlockPost)

router.route('/add_vehicle').post(upload.array('images'),addVehicleController.addVehicle)

router.route('/vehicles').get(viewVehiclesController.viewVehicles)

module.exports = router;
