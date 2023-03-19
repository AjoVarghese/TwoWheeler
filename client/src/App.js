import React  from 'react';
// import './App.css';
import { useSelector } from 'react-redux';
import {BrowserRouter as Router,Navigate,Route,Routes} from 'react-router-dom'
import Bookings from './PAGES/Admin/Bookings/Bookings';
// import SideBar from './Pages/Admin/Components/Navbar/SideBar';
import Dashboard from './PAGES/Admin/DashBoard/Dashboard';
import AdminLogin from './PAGES/Admin/Login/AdminLogin';
import Users from './PAGES/Admin/Users/Users';
import Vehicle from './PAGES/Admin/Vehicles/Vehicle';
import Bikes from './PAGES/User/Bikes/Bikes';
import Home from './PAGES/User/Home/Home';

import Login from "./PAGES/User/Login/Login";
import Otplogin from './PAGES/User/OTPLogin/Otplogin';
import Profile from './PAGES/User/Profile/Profile';
import Signup from "./PAGES/User/Signup/Signup";

function App() {
  const userdata = useSelector((state)=>state.userLoginReducer.userLoginDetails);
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


          {/* admin */}
          <Route exact path='/admin/login' element = {<AdminLogin/>}></Route>
          <Route exact path='/admin/dashboard' element = {<Dashboard/>}></Route>
          <Route exact path='/admin/users' element = {<Users/>}></Route>
          <Route exact path='/admin/vehicles' element = {<Vehicle/>}></Route>
          <Route exact path='/admin/bookings' element = {<Bookings/>}></Route>
          
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
