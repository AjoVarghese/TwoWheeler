import React, { useEffect, useState } from 'react'
import './Signup.css'
import 'semantic-ui-css/semantic.min.css'
import {Form,Button} from 'semantic-ui-react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useForm} from "react-hook-form"
import {useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {GoogleLogin} from '@react-oauth/google';
import { signUpGoogle, userRegister } from '../../../REDUX/Actions/USER_ACTIONS/RegisterAction'
import { signUpGoogleApi } from '../../../API/User/ApiCalls'
import { MDBCheckbox, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import { Box, TextField, Typography } from '@mui/material'


const schema = yup.object().shape({
    name : yup
            .string("name should be a string")
            .min(3,"name should have a min length of 3 letters")
            .required("name is required"),
    email : yup 
              .string('email should be a string')  
              .email('please provide a valid email')
              .required('email address is required'),      
    mobile : yup
            .string("email should be a string")
            .min(10, "Mobile No should have a minimum length of 10")
            .max(10, "Mobile No  should have a maximum length of 10")
            .required('Mobile No  is required'),
    password : yup  
               .string("password should be a string")
               .min(5, "password should have a minimum length of 5")
               .max(12, "password should have a maximum length of 12")
               .required("password is required"),
  })

function Signup() {
    // const [Name,setName] = useState('')
    // const [Email,setEmail] = useState('')
    // const [Mobile,setMobile] = useState()
    // const [Password,setPassword] = useState('')
    // const [ConfirmPassword,setConfirmPassword] = useState('')

   const dispatch = useDispatch()
   const navigate = useNavigate()

    // const {register,handleSubmit,formState : {errors}} = useForm()
    // const onSubmit = (e,data) => {
        
    //     dispatch(userRegister(Name,Email,Mobile,Password))
    //     navigate('/login')
    // }

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });

    const submitHandler = async(data) => {
        const Name = data.name
        const Email = data.email
        const Password = data.password
        const Mobile = data.mobile
        try {
            console.log("form",data);
             dispatch(userRegister(Name,Email,Mobile,Password))
             navigate('/login')
        } catch (error) {
            
        }
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
    // <div className='signup'>
    //     <div className='image-div'>
    //     <img src={require('../../../ASSETS/Images/Bike_signup.jpg')} ></img>
    //     </div>
    //     <div className='signup-box'>
    //       <div className='signup-body'>
    //         <h2 className='signup-header'>Create Account</h2>
           
    //         <div className='form-div'>
    //           <Form onSubmit={handleSubmit(onSubmit)}>
    //             <Form.Field>
    //                 <label>Name*</label>
    //                 <input type="text" placeholder='Your Name'
    //                 {...register("Name",
    //                 {
    //                     required:true,
    //                     maxLength:10
    //                 }
    //                 )}
    //                 onChange = {(e) => setName(e.target.value)}
    //                 />
    //             </Form.Field>
    //             {errors.Name && <p style={{color : 'red'}}>Please check the name</p>}
    //             <Form.Field>
    //                 <label>Email*</label>
    //                 <input type="email" placeholder='Your Email'
    //                 {...register('Email',
    //                 {
    //                     required:true,
    //                     pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ,
    //                 })}
    //                 onChange = {(e) => setEmail(e.target.value)}
    //                 />
    //             </Form.Field>
    //             {errors.Email && <p style={{color : 'red'}}>Please check teh email</p>}
    //             <Form.Field>
    //                 <label>Mobile No*</label>
    //                 <input type="text" placeholder='Your Mobile No'
    //                 {...register('Mobile',
    //                 {
    //                     required:true,
    //                     minLength : 10,
    //                     maxLength : 10
                      
    //                 })}
    //                 onChange = {(e) => setMobile(e.target.value)}
    //                 />
    //             </Form.Field>
    //             {errors.Mobile && <p style={{color : 'red'}}>Please check the Mobile No</p>}
    //             <Form.Field>
    //                 <label>Password*</label>
    //                 <input type="password" placeholder='Password'
    //                 {...register('Password',{
    //                     required:true,
                        
    //                     minLength:8,
    //                     maxLength:16
    //                 })}
    //                 onChange = {(e) => setPassword(e.target.value)}
    //                 />
    //             </Form.Field>
    //             {errors.Password && <p style={{color : 'red'}}>Please check the password</p>} 
    //             <Form.Field>
    //                 <label>Confirm Password*</label>
    //                 <input type="password" placeholder='Confirm Password'
    //                 {...register("ConfirmPassword",{
    //                     required:true,
    //                     minLength:8,
    //                     maxLength:16
    //                 })}
    //                 onChange = {(e) => setConfirmPassword(e.target.value)}
    //                 />
    //             </Form.Field>
    //             {errors.ConfirmPassword && <p style={{color : "red"}}>Please check the confirm password</p>}
    //             <Button type='submit' style={{color:"white",backgroundColor : "blue"}} className = 'signup-button'>Register</Button>
               
    //           </Form>
    //         </div>
    //       </div>
    //     </div>
        
    // </div>
    <div className='login'>

<MDBContainer className="p-3 my-5 mt-5">

<MDBRow>

  <MDBCol col='10' md='6' className='mt-5'>
    <img src={require('../../../ASSETS/Images/userLogin.png')} class="img-fluid" alt="Phone image" />
  </MDBCol>

  <MDBCol col='4' md='6'  className='mt-5'>
  <Typography component="h1" variant="h5">
        Sign In To Your Account!!
        </Typography>

     {/* {
          userLoginError ? <p className='p-error' style={{color : 'red'}}>{userLoginError}</p> : ""
         }
          
          {
            loading ? <p>{userLoginError}</p> : ''
          } */}

         <Box
          component="form"
          onSubmit={handleSubmit(submitHandler)}
          sx={{ mt: 1 }}
        >

           <TextField
            margin="normal"
            autoFocus
            fullWidth
            name = 'name'
            id="name"
            
            label="Name"
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
            {...register("name")}
          />
            
            <TextField
            margin="normal"
            
            fullWidth
            name = 'email'
            id="email"
        
            label="Email"
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
            {...register("email")}
          />

           <TextField
            margin="normal"
            type='number'
            fullWidth
            name = 'mobile'
            id="mobile"
            
            label="Mobile"
            error={!!errors.mobile}
            helperText={errors.mobile ? errors.mobile.message : ""}
            {...register("mobile")}
          />
          
          <TextField
            margin="normal"
            fullWidth
            name = 'password'
            id="password"
            label="Password"
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
            {...register("password")}
          />
           
            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{backgroundColor : "#F7CA18"}}
          >
            Sign Up
          </Button>
             </Box>

    {/* <div className="d-flex justify-content-between mx-4 mb-4">
      <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
      <a href="!#">Forgot password?</a>
    </div> */}

    {/* <MDBBtn className="mb-4 w-100" size="lg">Sign in</MDBBtn> */}

    <div className="divider d-flex align-items-center my-4">
      <p className="text-center fw-bold mx-3 mb-0">OR</p>
    </div>

    {/* <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
      <MDBIcon fab icon="facebook-f" className="mx-2"/>
      Continue with facebook
    </MDBBtn> */}
    <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            <Link to='/login'> Sign In</Link>
           
          </Button>

    {/* <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#55acee'}}>
      <MDBIcon fab icon="twitter" className="mx-2"/>
      SignIn With Google
    </MDBBtn> */}

<Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up with Ggogle
          </Button>

  </MDBCol>

</MDBRow>

</MDBContainer>
     
    </div>
  )
}

export default Signup