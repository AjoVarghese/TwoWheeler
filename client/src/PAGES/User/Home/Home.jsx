import React, { useEffect } from 'react'
import Navbar from '../../../COMPONENTS/NAVBAR/Navbar'
import './Home.css'
import 'semantic-ui-css/semantic.min.css'
import {Form,Button} from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userHomeReducer } from '../../../REDUX/Reducers/USER/userHomeReducer'
import { Toaster } from 'react-hot-toast'



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
      <section>
      <Toaster
       position="top-right"
       reverseOrder={false}
       toastOptions={{duration:4000}}
      />
       <div className='landing-page'>
        Landing Page
       </div>
      </section>
      
    </div>
  )
}

export default Home