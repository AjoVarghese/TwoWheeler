import React  from 'react';
// import './App.css';
// import { ChakraProvider } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import {BrowserRouter as Router,Navigate,Route,Routes} from 'react-router-dom'
import Bookings from './PAGES/Admin/Bookings/Bookings';
// import SideBar from './Pages/Admin/Components/Navbar/SideBar';
import Dashboard from './PAGES/Admin/DashBoard/Dashboard';
import AdminLogin from './PAGES/Admin/Login/AdminLogin';
import Users from './PAGES/Admin/Users/Users';
import AddVehicle from './PAGES/Admin/Vehicles/AddVehicle';
import Vehicle from './PAGES/Admin/Vehicles/Vehicle';
import Bikes from './PAGES/User/Bikes/Bikes';
import Home from './PAGES/User/Home/Home';

import Login from "./PAGES/User/Login/Login";
import Otplogin from './PAGES/User/OTPLogin/Otplogin';
import Profile from './PAGES/User/Profile/Profile';
import RentBikes from './PAGES/User/Rent Bikes/RentBikes';

import Signup from "./PAGES/User/Signup/Signup";

function App() {
  const userdata = useSelector((state)=>state.userLoginReducer.userLoginDetails);
  const adminData = useSelector((state) => state.adminLoginReducer.adminLoginData)
  console.log("ADMINdata",adminData);
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route exact path = '/' element = {<Home/>}> </Route>
          <Route exact path = '/signup' element = {userdata?<Navigate to='../'/> :<Signup/>}></Route>
          <Route exact path='/login' element = {userdata?<Navigate to='../'/> :<Login/>}></Route>
          <Route exact path='/bikes' element = {<Bikes/>}></Route>
          <Route exact path='/otp_login' element = {<Otplogin/>}></Route>
          <Route exact path = '/profile' element = {userdata?<Profile/>:<Navigate to='/login' />}></Route>
          <Route path='/rent-bikes' element={<RentBikes/>} />


          {/* admin */}
          <Route exact path='/admin/login' element = {adminData ? <Navigate to = '/admin/dashboard'/> : <AdminLogin/>}></Route>
          <Route exact path='/admin/dashboard' element = {adminData ? <Dashboard/> : <Navigate to = '/admin/login'/> }></Route>
          <Route exact path='/admin/users' element = {adminData ? <Users/> : <Navigate to = '/admin/login'/>}></Route>
          <Route exact path='/admin/bikes' element = {adminData ? <Vehicle/> : <Navigate to = '/admin/login'/>}></Route>
          <Route exact path = '/admin/add-bikes' element = {adminData ? <AddVehicle/> : <Navigate to = '/admin/login'/>}></Route>
          <Route exact path='/admin/bookings' element = {adminData ? <Bookings/> : <Navigate to={'/admin/login'}/>}></Route>
          
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
