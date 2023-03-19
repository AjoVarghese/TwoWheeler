import React, {  useState } from 'react'
import { useForm } from 'react-hook-form'
import 'semantic-ui-css/semantic.min.css'
import { Button, Form } from 'semantic-ui-react'
import './Otplogin.css'

function Otplogin() {
    const [otp,setOtp] = useState()
    const {register,handleSubmit,formState : {errors}} = useForm()

    const onSubmit = (data) => {
        console.log(data);
    }

    

  return (
    <div className='otp-login'>
      <div className='img-div'>
        <img src = {require('../../../ASSETS/Images/otpLogin.jpg')}  alt="" />
      </div>
      <div className='login-box'>
         <div className='login-body'>
            <h2 className = 'login-header'>OTP Login</h2>
            <div className='form-div'>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Field>
                        <label htmlFor="">Enter OTP*</label>
                        <input type="number" placeholder='Enter OTP'
                        {...register('OTP',{
                            required : true,
                            maxLength : 4,
                            minLength : 4
                        })} 
                        onChange = {(e) => setOtp(e.target.value)}
                         />
                    </Form.Field>
                    {errors.OTP && <p style={{color : "red"}}>Please check the OTP</p>}
                    <Button type='submit' className='otp-button' style= {{backgroundColor : '#0e7be8',color : 'white'}}>LOGIN</Button>
                </Form>
            </div>
         </div>
      </div>
    </div>
  )
}

export default Otplogin