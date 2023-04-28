import React, { useEffect } from 'react'
import Navbar from '../../../components/NAVBAR/Navbar'
import './Home.css'
import { Box, Tab, Tabs, Typography, styled } from '@mui/material'
import 'semantic-ui-css/semantic.min.css'
import {Form,Button} from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userHomeReducer } from '../../../redux/Reducers/USER/userHomeReducer'
import { Toaster } from 'react-hot-toast'
import Footer from '../../../components/Footer/Footer'
import Landing from '../../../components/Landing/Landing'
import LandingBikes from '../../../components/Landing/LandingBikes'
import {  homeGetBikesAction } from '../../../redux/Actions/USER_ACTIONS/getBikesAction'



function Home() {
  let navigate = useNavigate()
  let dispatch = useDispatch()

  let userData = useSelector(state => state.userLoginReducer)
  console.log("HOME USERDATA",userData);

  useEffect(() => {
    // let userInfo = localStorage.getItem("userInfo")
    dispatch(homeGetBikesAction())
    navigate('/')
  },[])
 
  const bikesData = useSelector((state) => state.bikesReducer.homeBikesData)
  console.log("HOME BIKE",bikesData);
  return (
   
    <div>
      <Navbar/>
      
      <Toaster
       position="top-right"
       reverseOrder={false}
       toastOptions={{duration:4000}}
      />
      <Box>
       <div className='landing-page'>
       <img src={require('../../../assets/Images/banner.png')} 
       className='img-fluid ' alt='...' 
       style={{height:'110%',width:'100%'}}
       />
       </div>
       <Box className='container mt-2' >
        <Landing/>
       </Box>
       <Box className='container mt-5 mb-3' >
         <h1 className='d-flex justify-content-center'>Rent your Bikes</h1>
           <LandingBikes bikes={bikesData}/>
           
       </Box>
       </Box>
        <Box className='mt-5'>
          <Footer/>
        </Box>
      
    </div>
  )
}

export default Home