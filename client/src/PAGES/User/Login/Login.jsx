import React, {  useState } from 'react'
import { useForm } from 'react-hook-form'
import 'semantic-ui-css/semantic.min.css'
// import {GoogleLogin,GoogleLogout} from 'react-google-login '
import { Button } from 'semantic-ui-react'
// import Dropdown from 'react-bootstrap/Dropdown';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { userLoginAction} from '../../../REDUX/Actions/USER_ACTIONS/LoginAction'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../../FIREBASE/firebase.config';
import { Box, TextField, Typography } from '@mui/material';
import {  MDBCheckbox, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



const schema = yup.object().shape({
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
function Login() {
  // const clientId = ''
  const [mobile,setMobile] = useState('+91')
  const [password,setPassword] = useState('')
  const [load,setLoad] = useState(false)
  const [showOtp,setShowOtp] = useState(false)

  // const [showLoginButton,setShowLoginButton] = useState(true)
  // const [showLogoutButton,setShowLogoutButton] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLoginData = useSelector(state => state.userLoginReducer)

  // const {userLoginData,userLoginError,loading} = userLogin

  console.log("USER LOGIN DATAAAA",userLoginData);

  const {userLoginDetails,userLoginError,loading} = userLoginData



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitHandler = async(data) => {
    try {
        console.log("form",data);
        dispatch(userLoginAction(data.mobile,data.password))
    } catch (error) {
      
    }
  }

 

  // function onCaptchaVerify(){
  //   if(!window.recaptchaVerifier){
  //     window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
  //       'size': 'invisible',
  //       'callback': (response) => {
  //         console.log("callback response",response);
  //         onOTPLogin()
  //       },
  //       'expired-callback': () => {
         
  //       }
  //     }, auth);
  //   }
  // }
  // const onOTPLogin = () => {
  //  setLoad(true)
  //  onCaptchaVerify()

  //  const appVerifier = window.recaptchaVerifier
  //  console.log("Mobile",mobile);
  //  const format = '+' + mobile

  //  signInWithPhoneNumber(auth,format,appVerifier).then((confirmationResult) => {
  //   console.log("confirmation result",confirmationResult);
        
  //   window.confirmationResult = confirmationResult;

  //   setLoad(false)
  //   navigate('/otp-login')
  //  })
  //  .catch((error) => {
  //   console.log(error,"OTP");
  //   window.prompt("Invalid Mobile No")
  //  })
  // }
  
  
   
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

<MDBContainer className="p-3 my-5 mt-5">

<MDBRow>

  <MDBCol col='10' md='6' className='mt-5'>
    <img src={require('../../../ASSETS/Images/userLogin.png')} class="img-fluid" alt="Phone image" />
  </MDBCol>

  <MDBCol col='4' md='6'  className='mt-5'>
  <Typography component="h1" variant="h5">
        Sign In To Your Account!!
        </Typography>

     {
          userLoginError ? <p className='p-error' style={{color : 'red'}}>{userLoginError}</p> : ""
         }
          
          {
            loading ? <p>{userLoginError}</p> : ''
          }

         <Box
          component="form"
          onSubmit={handleSubmit(submitHandler)}
          sx={{ mt: 1 }}
        >
            
           <TextField
            margin="normal"
            type='number'
            fullWidth
            name = 'mobile'
            id="mobile"
            autoFocus
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
            Sign In
          </Button>
             </Box>

    <div className="d-flex justify-content-between mx-4 mb-4">
      <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
      <a href="!#">Forgot password?</a>
    </div>

    {/* <MDBBtn className="mb-4 w-100" size="lg">Sign in</MDBBtn> */}

    <div className="divider d-flex align-items-center my-4">
      <p className="text-center fw-bold mx-3 mb-0">OR</p>
    </div>

    {/* <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
      <MDBIcon fab icon="facebook-f" className="mx-2"/>
      Continue with facebook
    </MDBBtn> */}
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <Item>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            
          >
            <Link to='/signup' style={{textDecoration:'none',color:"black"}}> Sign Up</Link>
           
          </Button>
        </Item>
        <Item>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            <Link to='/otp-login' style={{textDecoration:'none',color:"black"}}> Login with OTP</Link>
          </Button>
        </Item>
        {/* <Item>Item 3</Item> */}
      </Stack>
    </Box>

    

    {/* <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#55acee'}}>
      <MDBIcon fab icon="twitter" className="mx-2"/>
      SignIn With Google
    </MDBBtn> */}

        

  </MDBCol>

</MDBRow>

</MDBContainer>
     
    </div>
  )
}

export default Login