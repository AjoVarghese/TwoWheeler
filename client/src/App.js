import React  from 'react';
// import './App.css';
// import { ChakraProvider } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import {BrowserRouter as Router,Navigate,Route,Routes} from 'react-router-dom'
import Bookings from './pages/Admin/Bookings/Bookings';
// import SideBar from './Pages/Admin/Components/Navbar/SideBar';
import Dashboard from './pages/Admin/DashBoard/Dashboard';
import AddLocation from './pages/Admin/Locations/AddLocation';
import Locations from './pages/Admin/Locations/Locations';
import AdminLogin from './pages/Admin/Login/AdminLogin';
import RentRequets from './pages/Admin/RentRequets/RentRequets';
import Users from './pages/Admin/Users/Users';
import AddVehicle from './pages/Admin/Vehicles/AddVehicle';
import EditBike from './pages/Admin/Vehicles/EditBike';
import SingleBikeView from './pages/Admin/Vehicles/SingleBikeView';
import Vehicle from './pages/Admin/Vehicles/Vehicle';
import Bikes from './pages/User/Bikes/Bikes';
import Home from './pages/User/Home/Home';

import Login from "./pages/User/Login/Login";
import Otplogin from './pages/User/OTPLogin/Otplogin';
import Profile from './pages/User/Profile/Profile';
import RentBikes from './pages/User/Rent Bikes/RentBikes';
import ViewRentedBikes from './pages/User/Rent Bikes/ViewRentedBikes';

import Signup from "./pages/User/Signup/Signup";
import SingleView from './pages/User/SingleView/SingleView';
import Booking from './pages/User/Booking/Booking';
import Coupons from './pages/Admin/Coupons/Coupons';
import SuccessPage from './components/SuccessPage/SuccessPage';
import RentedRides from './pages/User/RentedRides/RentedRides';

function App() {
  const userdata = useSelector((state)=>state.userLoginReducer.userLoginDetails);
  const adminData = useSelector((state) => state.adminLoginReducer.adminLoginData)
  console.log("ADMINdata",adminData);
  console.log("USRDATA",userdata);
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route exact path = '/' element = {<Home/>}> </Route>
          <Route exact path = '/signup' element = {userdata?<Navigate to='../'/> :<Signup/>}></Route>
          <Route exact path='/login' element = {userdata?<Navigate to='../'/> :<Login/>}></Route>
          <Route exact path='/bikes' element = {<Bikes/>}></Route>
          <Route exact path = '/bike-detailed-view' element={<SingleView/>}></Route>
          <Route exact path='/otp-login' element = {userdata?<Navigate to='../'/> :<Otplogin/>}></Route>
          <Route exact path = '/profile' element = {userdata?<Profile/>:<Navigate to='/login' />}></Route>
          <Route path='/rent-bikes' element={<RentBikes/>} />
          <Route exact path='/rented-bikes' element={userdata ? <ViewRentedBikes/> : <Navigate to ='/login'/>}></Route>
          <Route exact path = '/booking-summary' element={userdata ? <Booking/> : <Navigate to = '/login'/>}></Route>
          <Route exact path = '/booking-success' element={<SuccessPage/>}></Route>
          <Route exact path = '/my-rents' element = {userdata ? <RentedRides/> : <Navigate to = '/login'/>}></Route>


          {/* admin */}
          <Route exact path='/admin/login' element = {adminData ? <Navigate to = '/admin/dashboard'/> : <AdminLogin/>}></Route>
          <Route exact path='/admin/dashboard' element = {adminData ? <Dashboard/> : <Navigate to = '/admin/login'/> }></Route>
          <Route exact path='/admin/users' element = {adminData ? <Users/> : <Navigate to = '/admin/login'/>}></Route>
          <Route exact path='/admin/bikes' element = {adminData ? <Vehicle/> : <Navigate to = '/admin/login'/>}></Route>
          <Route exact path = '/admin/bike-detailed-view' element = {adminData ? <SingleBikeView/> : <Navigate to = '/admin/login'/>}></Route>
          <Route exact path = '/admin/add-bikes' element = {adminData ? <AddVehicle/> : <Navigate to = '/admin/login'/>}></Route>
          <Route exact path='/admin/rent-requests' element = {adminData ? <RentRequets/> : <Navigate to = '/admin/login'/>}></Route>
          <Route exact path = '/admin/edit-bike' element={adminData ? <EditBike/> : <Navigate to='/admin/login'/>}></Route>
          <Route exact path = '/admin/locations' element={adminData ? <Locations/> : <Navigate to='/admin/login'/>}></Route>
          <Route exact path='/admin/add-location' element={adminData ? <AddLocation/> : <Navigate to='/admin/login'/>}></Route>
          <Route exact path='/admin/bookings' element = {adminData ? <Bookings/> : <Navigate to={'/admin/login'}/>}></Route>
          <Route exact path='/admin/coupons' element = {adminData ? <Coupons/> : <Navigate to = '/admin/login'/>}></Route>
          
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
