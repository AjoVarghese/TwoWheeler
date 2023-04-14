import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { createOrderAction } from '../../redux/Actions/USER_ACTIONS/createOrderAction'
import Box from '@mui/material/Box';
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

function SuccessPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  console.log("searchPrams",searchParams);
  const userId = searchParams.get('userId')
  console.log("userId",userId);
  const userName = searchParams.get('userName')
  const bikeId = searchParams.get('bikeId')
  const bikeName = searchParams.get('bikeName')
  const bikeModel = searchParams.get('bikeModel')
  const image = searchParams.get('image')
  const totalAmount = searchParams.get('totalAmount')
  const totalHours = searchParams.get('totalHours')
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')
  const loc = searchParams.get('location')
  const needHelmet = searchParams.get('needHelmet')
 
  console.log(image);

  const bookingDetails = {
    userId,
    userName,
    bikeId,
    bikeName,
    bikeModel,
    image,
    totalAmount,
    bookedTimeSlots : {
      startDate,
      endDate
    },
    totalHours,
    loc,
    needHelmet
  }

  useEffect(() => {
    dispatch(createOrderAction(bookingDetails))
  },[])

  setTimeout(() => {
    navigate('/my-rents')
  }, 2000);
  return (
    <div>
      <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <Item><h4>Booking Successfull</h4></Item>
        {/* <Item>Item 2</Item>
        <Item>Item 3</Item> */}
      </Stack>
    </Box>
    </div>
  )
}

export default SuccessPage