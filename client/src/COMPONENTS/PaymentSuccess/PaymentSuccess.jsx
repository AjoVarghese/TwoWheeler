import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { paymentSuccessAction } from '../../redux/Actions/USER_ACTIONS/payFineAction'

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
        <button 
        onClick={() => {
            navigate('/my-rents')
        }}
        > My-Ride</button>
    </div>
  )
}

export default PaymentSuccess