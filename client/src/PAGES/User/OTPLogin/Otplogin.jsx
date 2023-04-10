import React, {  useState } from 'react'
import { useForm } from 'react-hook-form'
import 'semantic-ui-css/semantic.min.css'
import { Button, Form } from 'semantic-ui-react'
import './Otplogin.css'
import { useNavigate } from 'react-router-dom'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '../../../firebase/firebase.config'
// import OtpInput from 'otp-input-react'
// import {BsTelephoneFill} from 'react-icons/cg'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {Toaster, toast} from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { otpLoginAction } from '../../../redux/Actions/USER_ACTIONS/LoginAction'


function Otplogin() {
    const [otp,setOtp] = useState('')
    const [phone,setPhone] = useState('')
    // const [loading,setLoading] = useState(false)
    const [showOTP,setShowOTP] = useState(false)
    const [user,setUser] = useState(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {register,handleSubmit,formState : {errors}} = useForm()

    // const onSubmit = (data) => {
    //     console.log(data);
    //     // onSignup()
    // }

    console.log(phone);

    function onCaptchaVerify(){
      if(!window.recaptchaVerifier){
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
          'size': 'invisible',
          'callback': (response) => {
            console.log("RESPONSE",response);
            onSignup()
          },
          'expired-callback': () => {
           
          }
        }, auth);
      }
    }

    function onSignup(){
      onCaptchaVerify()
      
      const appVerifier = window.recaptchaVerifier
      const phoneNumber = '+' + phone

      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      setShowOTP(true)
      toast.success('OTP successfully send!')
      window.confirmationResult = confirmationResult;
      // ...
    }).catch((error) => {
      console.log("OTP ERROR",error);
    });
    }

   function onOTPVerify(){
    window.confirmationResult.confirm(otp).then(async(result) => {
            console.log("REsult",result);
            console.log("mobile",result.user.phoneNumber);
           let mobile =  result.user.phoneNumber.substring(3)
           console.log("MOBILE",mobile);
            dispatch(otpLoginAction(mobile))
            toast.success('Logged in successfully!')
            // navigate('/')
      //     //  setLoading(false)
         })
         .catch((err) => {
          console.log("some error",err);
         // setLoading(false)
        })
   }
  return (
   
    <div className='otp-login'>
       <div id='recaptcha-container'></div>
      <Toaster toastOptions={{duration:4000}}></Toaster>
      {/* <div className='img-div'>
        <img src = {require('../../../ASSETS/Images/otpLogin.jpg')}  alt="" />
      </div> */}
      
      
      
      <div className='login-box'>
      {
            showOTP ? 
            <div className='login-body'>
            <h2 className = 'login-header'>Verify OTP</h2>
            <div className='form-div'>
           
                {/* <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Field> */}
                        <label htmlFor="">Enter the OTP*</label>
                        
                        <input type="text" placeholder='OTP'
                        {...register('OTP',{
                            required : true,
                            maxLength : 6,
                            minLength : 6,
                        })} 
                        onChange = {(e) => setOtp(e.target.value)}
                         />
                         {/* <OtpInput 
                         value={otp}
                         onChange={setOtp}
                         OTPLength={6}
                         otpType='number'
                         disabled={false}
                         autofocus
                         >

                         </OtpInput> */}
                        
                    {/* </Form.Field> */}
                    
                    {errors.OTP && <p style={{color : "red"}}>Please check the OTP</p>}
                    <Button type='submit' className='otp-button' style= {{backgroundColor : '#0e7be8',color : 'white'}} 
                     onClick={onOTPVerify}
                    >
                     
                      LOGIN</Button>
                {/* </Form> */}
                <div id='recaptcha-container'></div>
            </div>
         </div> : 
         
         <div className='login-body'>
            <h2 className = 'login-header'>OTP Login</h2>
            <div className='form-div'>
                {/* <Form onSubmit={handleSubmit(onSubmit)}> */}
                    {/* <Form.Field> */}
                        <label htmlFor="">Enter the mobile no*</label>
                        <PhoneInput country={"in"} 
                        value={phone}
                        onChange={setPhone}
                        // style={{width:"30rem"}}
                        />
                       
                        {/* <input type="number" placeholder='Mobile No'
                        {...register('mobile',{
                            required : true,
                            maxLength : 10,
                            minLength : 10
                        })} 
                        onChange = {(e) => setPhone(...phone,e.target.value)}
                         /> */}
                          {/* <BsTelephoneFill >ss</BsTelephoneFill> */}
                    {/* </Form.Field> */}
                    {errors.mobile && <p style={{color : "red"}}>Please check the Mobile No</p>}
                    <Button type='submit' className='otp-button' 
                    style= {{backgroundColor : '#0e7be8',color : 'white'}}
                    onClick={onSignup}
                    >Send OTP via SMS</Button>
                {/* </Form> */}
            </div>
         </div>

          }
         

         {/*  */}
         
      </div>
    </div>
  )
}

export default Otplogin