import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import 'semantic-ui-css/semantic.min.css'
// import {GoogleLogin,GoogleLogout} from 'react-google-login '
import { Button, Form } from 'semantic-ui-react'
import Dropdown from 'react-bootstrap/Dropdown';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { userLoginAction} from '../../../REDUX/Actions/USER_ACTIONS/LoginAction'

function Login() {
  // const clientId = ''
  const [mobile,setMobile] = useState('')
  const [password,setPassword] = useState('')
  // const [showLoginButton,setShowLoginButton] = useState(true)
  // const [showLogoutButton,setShowLogoutButton] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLoginData = useSelector(state => state.userLoginReducer)

  // const {userLoginData,userLoginError,loading} = userLogin

  console.log("USER LOGIN DATAAAA",userLoginData);

  const {userLoginDetails,userLoginError,loading} = userLoginData

  const {register,handleSubmit,formState:{errors}} = useForm()

  const onSubmit = (data) => {
    console.log(data);
    dispatch(userLoginAction(mobile,password))
    // navigate('/')
  }
   
  // useEffect(() => {

  // })

  // const onLoginSuccess = (res) => {
  //   console.log('Login Success',res.profileObj);
  //   setShowLoginButton(false)
  //   setShowLogoutButton(true)
  // }

  // const onLoginFailure = (res) => {
  //   console.log("Login Failed",res);
  // }

  // const onLogoutSuccess = () => {
  //   alert("Logged out suuceesfully")
  // }

  

  return (
    <div className='login'>
     <div className='imgg-div'>
       <img src={require('../../../ASSETS/Images/login.jpg')} alt="" />
     </div>
     <div className='login-box'>
        <div className='login-body'>
         <h2 className='login-header'>Login</h2>
         {/* <div className='google'>
             <button><img src = '' alt = 'Login with Google'></img></button>
         </div> */}
         {/* <GoogleLogin
    clientId={clientId}
    render={renderProps => (
      <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
    )}
    buttonText="Login"
    onSuccess={onLoginSuccess}
    onFailure={onLoginFailure}
    cookiePolicy={'single_host_origin'}
  />, */}
         {
          userLoginError ? <p className='p-error' style={{color : 'red'}}>{userLoginError}</p> : ""
         }
          
          {
            loading ? <p>{userLoginError}</p> : ''
          }

         <div className='form-div'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Field>
              <label>Mobile No*</label>
              <input type="number" placeholder='Enter registered Mobile NO' style={{textDecoration: 'none'}}
              {...register('Email',{
                required : true,
                maxLength : 10,
                minLength : 10
                // pattern : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
              })}
              onChange = {(e) => setMobile(e.target.value)}
               />
            </Form.Field>
            {errors.Email && <p style={{color : "red"}}>Please check the Mobile No</p>}
            <Form.Field>
              <label>Password*</label>
              <input type="password" placeholder='Enter your password'
              {...register('Password',{
                required:true,
                minLength:8,
                maxLength:16
              })}
              onChange = {(e) => setPassword(e.target.value)}
               />
            </Form.Field>
            {errors.Password && <p style={{color : "red"}}>Please check the Password</p>}
            <Button type='submit' style={{color:"white",backgroundColor : "blue"}} className = "login-button">Login</Button>
            <p className='or'>OR</p>
          <Button type='submit' style={{color:"white",backgroundColor : "blue"}} className = "otp-button"><Link className='link' to = '/otp_login'>Login With OTP</Link></Button>
          <h4 className='no-account'><Link to='/signup'>Don't have an account? Signup</Link></h4>
          </Form>
         
         </div>
        </div>
     </div>
     {/* <GoogleLogout
      clientId={clientId}
      buttonText="Logout"
      onLogoutSuccess={onLogoutSuccess}
    >
    </GoogleLogout> */}
    </div>
  )
}

export default Login