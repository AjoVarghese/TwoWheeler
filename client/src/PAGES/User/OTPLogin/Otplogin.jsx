import React, {  useState } from 'react'
import { useForm } from 'react-hook-form'
import 'semantic-ui-css/semantic.min.css'
import { Button, Form } from 'semantic-ui-react'
import './Otplogin.css'
import { useNavigate } from 'react-router-dom'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '../../../FIREBASE/firebase.config'


function Otplogin() {
    const [otp,setOtp] = useState('')
    const [phone,setPhone] = useState('')
    const [loading,setLoading] = useState(false)
    const [showOTP,setShowOTP] = useState(false)
    const [user,setUser] = useState(null)

    const navigate = useNavigate()

    const {register,handleSubmit,formState : {errors}} = useForm()

    const onSubmit = (data) => {
        console.log(data);
        onSignup()
    }

    console.log(phone);

    function onCaptchaVerify(){
      console.log("ssssssss");
      if(!window.recaptchaVerifier){
        console.log('qqqqq');
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
          'size': 'invisible',
          'callback': (response) => {
            console.log("signup response",response);
            onSignup()
          },
          'expired-callback': () => {
            
          }
        }, auth);
      }
    }
  
    function onSignup(){
      console.log("sign fun");
      setLoading(true)
      onCaptchaVerify()

      const appVerifier = window.recaptchaVerifier
      const formatPhone = '+' + phone

      signInWithPhoneNumber(auth, formatPhone, appVerifier)
    .then((confirmationResult) => {
      
      window.confirmationResult = confirmationResult;
      setLoading(false)
      setShowOTP(true)
      // toast.success("OTP Send")
      console.log("OTP send");
     
    }).catch((error) => {
      console.log("OTP ERROR",error);
      setLoading(false)
    });
    }

    function onOTPVerify(){
      setLoading(true)
      window.confirmationResult.confirm(otp).then(async(result) => {
         console.log("REsult",result);
         setLoading(false)
      })
      .catch((err) => {
        console.log("some error",err);
        setLoading(false)
      })
    }
  return (
   
    <div className='otp-login'>
      <div className='img-div'>
        <img src = {require('../../../ASSETS/Images/otpLogin.jpg')}  alt="" />
      </div>
      {/* <Toaster toastOptions = {{duration : 4000}}/> */}
      
      <div className='login-box'>
      {
            showOTP ? 
            <div className='login-body'>
            <h2 className = 'login-header'>Verify OTP</h2>
            <div className='form-div'>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Field>
                        <label htmlFor="">Enter the OTP*</label>
                        
                        <input type="text" placeholder='OTP'
                        {...register('OTP',{
                            required : true,
                            maxLength : 6,
                            minLength : 6,
                        })} 
                        onChange = {(e) => setOtp(e.target.value)}
                         />
                    </Form.Field>
                    
                    {errors.OTP && <p style={{color : "red"}}>Please check the OTP</p>}
                    <Button type='submit' className='otp-button' style= {{backgroundColor : '#0e7be8',color : 'white'}} onClick={onOTPVerify}>
                     
                      LOGIN</Button>
                </Form>
                <div id='recaptcha-container'></div>
            </div>
         </div> : 
         
         <div className='login-body'>
            <h2 className = 'login-header'>OTP Login</h2>
            <div className='form-div'>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Field>
                        <label htmlFor="">Enter the mobile no*</label>
                        
                       
                        <input type="number" placeholder='Mobile No'
                        {...register('mobile',{
                            required : true,
                            maxLength : 10,
                            minLength : 10
                        })} 
                        onChange = {(e) => setPhone(...phone,e.target.value)}
                         />
                    </Form.Field>
                    {errors.mobile && <p style={{color : "red"}}>Please check the Mobile No</p>}
                    <Button type='submit' className='otp-button' style= {{backgroundColor : '#0e7be8',color : 'white'}}>Send OTP via SMS</Button>
                </Form>
            </div>
         </div>

          }
         

         {/*  */}
         
      </div>
    </div>
  )
}

export default Otplogin