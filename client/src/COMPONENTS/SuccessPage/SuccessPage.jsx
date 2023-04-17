import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { createOrderAction } from '../../redux/Actions/USER_ACTIONS/createOrderAction'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { Button, Grid } from '@mui/material';
import Sheet from '@mui/joy/Sheet';
// import Stack from '@mui/joy/Stack';
// import { styled } from '@mui/joy/styles';

const item = styled(Sheet)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.vars.palette.text.tertiary,
}));

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
  const userId = searchParams.get('userId').trim()
  console.log("userId",userId);
  const userName = searchParams.get('userName').trim()
  const bikeId = searchParams.get('bikeId').trim()
  const bikeName = searchParams.get('bikeName').trim()
  const bikeModel = searchParams.get('bikeModel')
  const image = searchParams.get('image').trim()
  const totalAmount = searchParams.get('totalAmount').trim()
  const totalHours = searchParams.get('totalHours').trim()
  const startDate = searchParams.get('startDate').trim()
  const endDate = searchParams.get('endDate').trim()
  const loc = searchParams.get('location').trim()
  const needHelmet = searchParams.get('needHelmet').trim()
  const paymentType = searchParams.get('paymentType').trim()
  const couponCode = searchParams.get('couponCode').trim()
  console.log('COPOOONNN',couponCode);
 
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
    needHelmet,
    paymentType,
    couponCode
  }
 
  console.log("BOOKING DETSILS",bookingDetails);
  useEffect(() => {
    dispatch(createOrderAction(bookingDetails))
  },[])

  // setTimeout(() => {
  //   navigate('/my-rents')
  // }, 2000);
  return (
    <div>
       <Box sx={{ width: '100%' }}  className='mt-5 container' >
       <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={7}>
        <Item>
        <figure className='figure'>
        <img
        src={require('../../../src/assets/Images/successs.jpg')}
        className='figure-img img-fluid rounded shadow-3 mb-3'
        alt='...'
        style={{width : '40rem'}}
      />
      {/* <figcaption className='figure-caption text-end'>A caption for the above image.</figcaption> */}
    </figure>
        </Item>
      </Grid>
      <Grid xs={4}>
        <Item>
        <Stack spacing={2} sx={{ width: '100%' }}>
      {/* <Item> */}
      <figure className='figure'>
        <img
        src={require('../../../src/assets/Images/check.png')}
        className='figure-img img-fluid rounded shadow-3 mb-3'
        alt='...'
        style={{width : '7rem'}}
      />
      {/* <figcaption className='figure-caption text-end'>A caption for the above image.</figcaption> */}
    </figure>
      {/* </Item> */}
      {/* <Item> */}
        <h5>Booking Successfull</h5>
        <p>Go to my rides to view more details</p>
      {/* </Item> */}
      {/* <Item> */}
      <Button size="md" style={{backgroundColor : "#fed250"}}><Link to = '/my-rents' style={{color :'black',textDecoration :'none',}}>My Rides</Link></Button>
      {/* </Item> */}
    </Stack>
        </Item>
      </Grid>
      {/* <Grid xs={4}>
        <Item>xs=4</Item>
      </Grid>
      <Grid xs={8}>
        <Item>xs=8</Item>
      </Grid> */}
    </Grid>
       </Box>
       
      {/* <Box sx={{ width: '100%' }}
       className = ' mb-auto mt-5'
        align='center'>
      <Stack spacing={2} >
        <h4>Ddd</h4>
      </Stack>
    </Box> */}
    {/* <MDBRow>
      <MDBCol md='8'>
        md="8"
      </MDBCol>
      <MDBCol md='4'>
        md="4"
      </MDBCol>
    </MDBRow> */}
    </div>
  )
}

export default SuccessPage