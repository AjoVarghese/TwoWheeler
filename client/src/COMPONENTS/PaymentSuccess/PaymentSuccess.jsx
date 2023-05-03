import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { paymentSuccessAction } from '../../redux/Actions/USER_ACTIONS/payFineAction'
import { MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import { Button } from '@mui/material'

function PaymentSuccess() {
    const dispatch = useDispatch()

    const location = useLocation()

    const searchParams = new URLSearchParams(location.search)
   
    const userId = searchParams.get('userId').trim()
   
    const bikeId = searchParams.get('bikeId').trim()
    const bookingId = searchParams.get('bookingId').trim()
    const startTime = searchParams.get('startTime').trim()
    const endTime = searchParams.get('endTime').trim()
  

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
        
      </MDBCardBody>
    </MDBCard>

  </MDBCol>
</MDBRow>

</MDBContainer>
        
    </div>
  )
}

export default PaymentSuccess