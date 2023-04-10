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
import { signUpGoogle, userRegister } from '../../../redux/Actions/USER_ACTIONS/RegisterAction'
import { signUpGoogleApi } from '../../../api/User/ApiCalls'
import { MDBCheckbox, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import { Box, TextField, Typography } from '@mui/material'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../../firebase/firebase.config';
import { googleSignupAction } from '../../../redux/Actions/USER_ACTIONS/googleSignupAction';


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
    referalCode : yup.string().optional()           
  })

function Signup() {
    

   const dispatch = useDispatch()
   const navigate = useNavigate()

    

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });

    const submitHandler = async(data) => {
      console.log("sdsd",data);
        const Name = data.name
        const Email = data.email
        const Password = data.password
        const Mobile = data.mobile
        const Referral = data.referalCode
        try {
             dispatch(userRegister(Name,Email,Mobile,Password,Referral))
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

   const googleSignup = () => {
    console.log('xxxxxx');
    signInWithPopup(auth,provider).then((data) => {
      console.log('google',data);
      dispatch(googleSignupAction(data.user.displayName,data.user.email,data.user.phoneNumber,data.user.photoURL))
    })
   }

  return (
    <div className='login'>

<MDBContainer className="p-3 my-5 mt-5">

<MDBRow>

  <MDBCol col='10' md='6' className='mt-5'>
    <img src={require('../../../assets/Images/userLogin.png')} class="img-fluid" alt="Phone image" />
  </MDBCol>

  <MDBCol col='4' md='6'  className='mt-5'>
  <Typography component="h1" variant="h5">
        Sign In To Your Account!!
        </Typography>


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

          <TextField
            margin="normal"
            fullWidth
            name = 'referalCode'
            id="referalCode"
            label="Referal Code(optional)"
            {...register("referalCode")}
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

    <div className="divider d-flex align-items-center my-4">
      <p className="text-center fw-bold mx-3 mb-0">OR</p>
    </div>

    <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            <Link to='/login'> Sign In</Link>
           
          </Button>

<Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={googleSignup}
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