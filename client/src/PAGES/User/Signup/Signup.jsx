import React, { useEffect, useState } from 'react'
import './Signup.css'
import 'semantic-ui-css/semantic.min.css'
import {Form,Button} from 'semantic-ui-react'
import {useForm} from "react-hook-form"
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {GoogleLogin} from '@react-oauth/google';
import { signUpGoogle, userRegister } from '../../../REDUX/Actions/USER_ACTIONS/RegisterAction'
import { signUpGoogleApi } from '../../../API/User/ApiCalls'

function Signup() {
    const [Name,setName] = useState('')
    const [Email,setEmail] = useState('')
    const [Mobile,setMobile] = useState()
    const [Password,setPassword] = useState('')
    const [ConfirmPassword,setConfirmPassword] = useState('')

   const dispatch = useDispatch()
   const navigate = useNavigate()

    const {register,handleSubmit,formState : {errors}} = useForm()
    const onSubmit = (e,data) => {
        //  e.preventDefault()
        // console.log(data);
        dispatch(userRegister(Name,Email,Mobile,Password))
        navigate('/login')
    }

    useEffect(() => {
        let userInfo = localStorage.getItem("userInfo")

        if(userInfo){
            navigate('/')
        } else {
            navigate('/signup')
        }
    },[])

//     function handleGoogleLoginSuccess(tokenResponse){
//         const accessToken = tokenResponse.access_token;
//         dispatch(signUpGoogleApi(accessToken))
//     }

//    const handleClick = GoogleLogin({onSuccess : handleGoogleLoginSuccess})

  return (
    <div className='signup'>
        <div className='image-div'>
        <img src={require('../../../ASSETS/Images/Bike_signup.jpg')} ></img>
        </div>
        <div className='signup-box'>
          <div className='signup-body'>
            <h2 className='signup-header'>Create Account</h2>
            {/* <div className='google'>
                <button><img src="" alt="Sign Up with Google" /></button>
             
            </div> */}
            <div className='form-div'>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Field>
                    <label>Name*</label>
                    <input type="text" placeholder='Your Name'
                    {...register("Name",
                    {
                        required:true,
                        maxLength:10
                    }
                    )}
                    onChange = {(e) => setName(e.target.value)}
                    />
                </Form.Field>
                {errors.Name && <p style={{color : 'red'}}>Please check the name</p>}
                <Form.Field>
                    <label>Email*</label>
                    <input type="email" placeholder='Your Email'
                    {...register('Email',
                    {
                        required:true,
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ,
                    })}
                    onChange = {(e) => setEmail(e.target.value)}
                    />
                </Form.Field>
                {errors.Email && <p style={{color : 'red'}}>Please check teh email</p>}
                <Form.Field>
                    <label>Mobile No*</label>
                    <input type="text" placeholder='Your Mobile No'
                    {...register('Mobile',
                    {
                        required:true,
                        minLength : 10,
                        maxLength : 10
                        // pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ,
                    })}
                    onChange = {(e) => setMobile(e.target.value)}
                    />
                </Form.Field>
                {errors.Mobile && <p style={{color : 'red'}}>Please check the Mobile No</p>}
                <Form.Field>
                    <label>Password*</label>
                    <input type="password" placeholder='Password'
                    {...register('Password',{
                        required:true,
                        // pattern :  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                        minLength:8,
                        maxLength:16
                    })}
                    onChange = {(e) => setPassword(e.target.value)}
                    />
                </Form.Field>
                {errors.Password && <p style={{color : 'red'}}>Please check the password</p>} 
                {/* <Form.Field>
                    <label>Confirm Password*</label>
                    <input type="password" placeholder='Confirm Password'
                    {...register("ConfirmPassword",{
                        required:true,
                        minLength:8,
                        maxLength:16
                    })}
                    onChange = {(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Field>
                {errors.ConfirmPassword && <p style={{color : "red"}}>Please check the confirm password</p>} */}
                <Button type='submit' style={{color:"white",backgroundColor : "blue"}} className = 'signup-button'>Register</Button>
               
              </Form>
            </div>
          </div>
        </div>
        
    </div>
  )
}

export default Signup