import React  from 'react';
// import './App.css';
// import { ChakraProvider } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import {BrowserRouter as Router,Navigate,Route,Routes} from 'react-router-dom'
import Bookings from './PAGES/Admin/Bookings/Bookings';
// import SideBar from './Pages/Admin/Components/Navbar/SideBar';
import Dashboard from './PAGES/Admin/DashBoard/Dashboard';
import AddLocation from './PAGES/Admin/Locations/AddLocation';
import Locations from './PAGES/Admin/Locations/Locations';
import AdminLogin from './PAGES/Admin/Login/AdminLogin';
import RentRequets from './PAGES/Admin/RentRequets/RentRequets';
import Users from './PAGES/Admin/Users/Users';
import AddVehicle from './PAGES/Admin/Vehicles/AddVehicle';
import EditBike from './PAGES/Admin/Vehicles/EditBike';
import SingleBikeView from './PAGES/Admin/Vehicles/SingleBikeView';
import Vehicle from './PAGES/Admin/Vehicles/Vehicle';
import Bikes from './PAGES/User/Bikes/Bikes';
import Home from './PAGES/User/Home/Home';

import Login from "./PAGES/User/Login/Login";
import Otplogin from './PAGES/User/OTPLogin/Otplogin';
import Profile from './PAGES/User/Profile/Profile';
import RentBikes from './PAGES/User/Rent Bikes/RentBikes';
import ViewRentedBikes from './PAGES/User/Rent Bikes/ViewRentedBikes';

import Signup from "./PAGES/User/Signup/Signup";
import SingleView from './PAGES/User/SingleView/SingleView';
import Booking from './PAGES/User/Booking/Booking';
import Coupons from './PAGES/Admin/Coupons/Coupons';

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
