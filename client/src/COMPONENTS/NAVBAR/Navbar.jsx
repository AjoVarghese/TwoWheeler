import React from 'react'
import './Navbar.css'
// import { FaBeer } from 'react-icons/fa';
// import {GiHamburgerMenu} from 'react-icons/gi'
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { userLogoutAction } from '../../REDUX/Actions/USER_ACTIONS/LogoutAction';

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const user = useSelector((state) => state.userLoginReducer)
  const {userLoginDetails} = user
  console.log("DDDDD",userLoginDetails);

  
  const logout = () => {
    dispatch(userLogoutAction())
    navigate('/login')
  }
  return (
    <div>
        <nav className='main-nav'>
          <div className='logo'>
            <a href="">
            <img src={require('../../ASSETS/Images/scooterLogo.png')} alt="" />
            </a>
            
          </div>

          <div className='menu-link'>
            <ul>
               <li><Link to='/'>Home</Link></li> 
               <li><Link to='/bikes'>Bikes</Link></li>
               <li><Link to='/offers'>Offers</Link></li>
               <li><Link to='/partner'>Partner With Us</Link></li>
            </ul>
          </div>

          <div className='end-nav'>
            <ul className='end-ul'>
            {/* <li>
                <select name="Location" id="">
                    <option value="">Bangalore</option>
                    <option value="">Kochi</option>
                </select>
            </li> */}
            {
              userLoginDetails ? 
                
              <li className='dropdown'>
            <Dropdown  className='dropdown' >
      <Dropdown.Toggle  id="dropdown-basic" className='dropdown'>
        {
        userLoginDetails ? userLoginDetails.Name : "User"
      }
      </Dropdown.Toggle>
     
      <Dropdown.Menu>
        
        <Dropdown.Item><Link to='/profile'>My Profile</Link></Dropdown.Item>
        <Dropdown.Item href="#/action-2">My Rides</Dropdown.Item>
        <Dropdown.Item href="#/action-3">My Wallet</Dropdown.Item>
        <Dropdown.Item ><Link to='/login' onClick={(e) =>logout()}>Logout</Link></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
            </li> :
            <li><Link to = '/login'>Sign In</Link></li>
              
            }
            
                {/* <li><Link to='/profile'>Profile</Link></li>
                <li><Link to='/login' onClick={(e) =>logout()}>Logout</Link></li> */}
            </ul>

            {/* <div className='hamburger-menu'>
                <a href="">
                    <GiHamburgerMenu style={{color :'black'}}/>
                </a>
            </div> */}
          </div>
        </nav>
    </div>
  )
}

export default Navbar