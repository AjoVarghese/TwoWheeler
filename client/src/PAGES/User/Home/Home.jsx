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



function Home() {
  let navigate = useNavigate()
  let dispatch = useDispatch()

  let userData = useSelector(state => state.userLoginReducer)
  console.log("HOME USERDATA",userData);

  useEffect(() => {
    let userInfo = localStorage.getItem("userInfo")
    console.log("HOME USERINFO",userInfo);
    navigate('/')
  },[])
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
       className='img-fluid' alt='...' 
       style={{height:'110%',width:'100%'}}
       />
       </div>
       <Box className='container mt-3' >
        <Landing/>
       </Box>
       </Box>
        <Box className='mt-5'>
          <Footer/>
        </Box>
      
    </div>
  )
}

export default Home