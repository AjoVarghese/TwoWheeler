import React, { useState } from 'react';
import TextField from "@mui/material/TextField";
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginAction } from '../../../redux/Actions/ADMIN_ACTIONS/LoginAction';
import { Box, Button, Typography } from '@mui/material';

const schema = yup.object().shape({
  email : yup
         .string("email should be a string")
         .email('please provide a valid email')
         .required('email address is required'),
  password : yup  
             .string("password should be a string")
             .min(5, "password should have a minimum length of 5")
             .max(12, "password should have a maximum length of 12")
             .required("password is required"),
})

function AdminLogin() {

  // const [email,setEmail] = useState('')
  // const [password,setPassword] = useState('')

  const dispatch = useDispatch()
  // const navigate = useNavigate()

  // const handleLogin = () => {
  //   console.log("CREDE",email,password);
  //   dispatch(LoginAction(email,password))
    
   
  // }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitHandler = async(data) => {
    console.log('formData',data);
    try {
      console.log("CREDE",data.password);
      dispatch(LoginAction(data.email,data.password))
    } catch (error) {
      
    }
  }

  return (
    
    <MDBContainer  className="p-3 my-5 h-custom ">
       <div style={{boxShadow : '10px 15px 10px grey',borderRadius : '5px' , border : 'none'}}>
      <MDBRow >

        

        <MDBCol col='10' md='6'>
          <img src={require('../../../assets/Images/adminloign.png')} class="img-fluid" alt="Sample image" />
        </MDBCol>

        

        <MDBCol col='4' md='5' className='mt-5 me-2' >
         
        {/* <MDBCol className='mt-5'>
           <h2 className=''>Sign In To Your Account!!</h2>
        </MDBCol> */}
        <Typography component="h1" variant="h5">
        Sign In To Your Account!!
        </Typography>
{/*           
           <label htmlFor="" className='mt-5'>Email</label>
          <MDBInput wrapperClass='mb-4'  id='formControlLg' type='email' size="lg" className='me-5' onChange = {(e) => setEmail(e.target.value)}/>
          <label htmlFor="">Password</label>
          <MDBInput wrapperClass='mb-4' id='formControlLg' type='password' size="lg" onChange={(e) => setPassword(e.target.value)}/>

          <div className="d-flex justify-content-between mb-4">
            <MDBCol name='flexCheck' value=''  />
            <a href="!#">Forgot password?</a>
          </div> */}
          <Box
          component="form"
          onSubmit={handleSubmit(submitHandler)}
          sx={{ mt: 1 }}
        >
            
           <TextField
            margin="normal"
            fullWidth
            name = 'email'
            id="email"
            autoFocus
            label="Email"
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
            {...register("email")}
          />
          {
            errors.email ? 
                (
                  <span>{errors.email.message}</span>
                ) : (
                  <></>
                )
          }

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
            {
            errors.password ? 
                (
                  <span>{errors.password.message}</span>
                ) : (
                  <></>
                )
          }
            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
             </Box>

          {/* <div className='text-center text-md-start mt-4 pt-2'>
           <button style={{backgroundColor : '#e3bb4d',border : 'none' , borderRadius : '5px'}} className = 'ms-5 mb-5 ' onClick = {handleLogin}>Login</button>
           
          </div> */}

        </MDBCol>

      </MDBRow>

      
         </div>
    </MDBContainer>
   
  );
}

export default AdminLogin;