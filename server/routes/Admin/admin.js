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
const deleteBikeController = require('../../Controller/Admin/VehiclesController/deleteBikeController')
const bikeDetailsCOntroller = require('../../Controller/Admin/VehiclesController/bikeDetailedView')
const rentRequetsController = require('../../Controller/Admin/rentRequetsController')
const rentRequests = require('../../Controller/Admin/RentRequests/RentRequets')

const {protect} = require('../../middleware/jwtAuth')


router.post('/signup',adminSignup.adminSignupPost)

router.post('/login',adminLogin.adminLoginPost)

// router.get('/admin_dashboard',adminDashboardController.getUserDetails)

router.route('/users').get(protect,userController.getUserDetails)

router.route('/blockUnblock').get(protect,blockUnblockController.userBlockUnBlockPost)

// router.post('/blockUnblock',blockUnblockController.userBlockUnBlockPost)

router.route('/add-bikes').post(protect,upload.array('images'),addVehicleController.addVehicle)

router.route('/bikes').get(protect,viewVehiclesController.viewVehicles)

router.route('/delete-bike').get(protect,deleteBikeController.deleteBike)

router.route('/bike-detailed-view').get(protect,bikeDetailsCOntroller.bikeDetailsController)

router.route('/rent-requests').get(protect,rentRequests.getRentRequests)

router.route('/accept-request').get(protect,rentRequetsController.acceptRequetsController)

router.route('/reject-requests').get(protect,rentRequetsController.rejectRequestsController)



module.exports = router;
