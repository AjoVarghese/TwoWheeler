import React, { useState } from 'react';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginAction } from '../../../REDUX/Actions/ADMIN_ACTIONS/LoginAction';

function AdminLogin() {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = () => {
    console.log("CREDE",email,password);
    dispatch(LoginAction(email,password))
    
    // navigate('/admin/dashboard')
  }

  return (
    
    <MDBContainer  className="p-3 my-5 h-custom ">
       <div style={{boxShadow : '10px 15px 10px grey',borderRadius : '5px' , border : 'none'}}>
      <MDBRow >

        

        <MDBCol col='10' md='6'>
          <img src={require('../../../ASSETS/Images/adminloign.png')} class="img-fluid" alt="Sample image" />
        </MDBCol>

        

        <MDBCol col='4' md='5' className='mt-5 me-2' >
         
        <MDBCol className='mt-5'>
           <h2 className=''>Sign In To Your Account!!</h2>
        </MDBCol>
          
           <label htmlFor="" className='mt-5'>Email</label>
          <MDBInput wrapperClass='mb-4'  id='formControlLg' type='email' size="lg" className='me-5' onChange = {(e) => setEmail(e.target.value)}/>
          <label htmlFor="">Password</label>
          <MDBInput wrapperClass='mb-4' id='formControlLg' type='password' size="lg" onChange={(e) => setPassword(e.target.value)}/>

          <div className="d-flex justify-content-between mb-4">
            <MDBCol name='flexCheck' value=''  />
            <a href="!#">Forgot password?</a>
          </div>

          <div className='text-center text-md-start mt-4 pt-2'>
           <button style={{backgroundColor : '#e3bb4d',border : 'none' , borderRadius : '5px'}} className = 'ms-5 mb-5 ' onClick = {handleLogin}>Login</button>
            {/* <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="#!" className="link-danger">Register</a></p> */}
          </div>

        </MDBCol>

      </MDBRow>

      {/* <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

        <div className="text-white mb-3 mb-md-0">
          Copyright © 2020. All rights reserved.
        </div>

        <div>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='facebook-f' size="md"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white'  }}>
            <MDBIcon fab icon='twitter' size="md"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white'  }}>
            <MDBIcon fab icon='google' size="md"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white'  }}>
            <MDBIcon fab icon='linkedin-in' size="md"/>
          </MDBBtn>

        </div>

      </div> */}
         </div>
    </MDBContainer>
   
  );
}

export default AdminLogin;