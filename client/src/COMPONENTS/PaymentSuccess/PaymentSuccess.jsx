import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { paymentSuccessAction } from '../../redux/Actions/USER_ACTIONS/payFineAction'
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow } from 'mdb-react-ui-kit'
import { Button } from '@mui/material'

function PaymentSuccess() {
    const dispatch = useDispatch()

    const location = useLocation()

    const searchParams = new URLSearchParams(location.search)
    console.log('searchasd',searchParams);
    const userId = searchParams.get('userId').trim()
    console.log(userId);
    const bikeId = searchParams.get('bikeId').trim()
    const bookingId = searchParams.get('bookingId').trim()
    const startTime = searchParams.get('startTime').trim()
    const endTime = searchParams.get('endTime').trim()
    console.log(endTime);

    const navigate = useNavigate()

    const fineDetails = {
        userId,
        bikeId,
        bookingId,
        startTime,
        endTime
    }
    useEffect(() => {
       dispatch(paymentSuccessAction(fineDetails))
    },[])
  return (
    <div>
      <MDBContainer fluid>

<MDBRow className='d-flex justify-content-center align-items-center h-100'>
  <MDBCol col='12'>

  

    <MDBCard className=' text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
      <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
            
      <figure className='figure' >
      <img
        src={require('../../../src/assets/Images/payment_success.jpg')}
        className='figure-img img-fluid rounded shadow-3 mb-3'
        alt='...'
      />
      <figcaption className='figure-caption'><h5>Payment Successfull</h5></figcaption>
      
    </figure>
    <Button 
        onClick={() => {
            navigate('/my-rents')
        }}
        > Go to My-Ride</Button>
        {/* <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
        <p className="text-white-50 mb-5">Please enter your login and password!</p>

        <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address' id='formControlLg' type='email' size="lg"/>
        <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg"/>

        <p className="small mb-3 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>
        <MDBBtn outline className='mx-2 px-5' color='white' size='lg'>
          Login
        </MDBBtn> */}

        {/* <div className='d-flex flex-row mt-3 mb-5'>
          <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='facebook-f' size="lg"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='twitter' size="lg"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='google' size="lg"/>
          </MDBBtn>
        </div> */}

        {/* <div>
          <p className="mb-0">Don't have an account? <a href="#!" class="text-white-50 fw-bold">Sign Up</a></p>

        </div> */}
      </MDBCardBody>
    </MDBCard>

  </MDBCol>
</MDBRow>

</MDBContainer>
        
    </div>
  )
}

export default PaymentSuccess