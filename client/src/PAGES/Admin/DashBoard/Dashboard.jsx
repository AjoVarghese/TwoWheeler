import { Box, Button, Card, CardActions, CardContent, Grid, Paper, Stack, Typography, styled } from '@mui/material'
import React, { useEffect } from 'react'
import AdminSideBar from '../../../components/NAVBAR/AdminSideBar'
import BasicCard from '../../../components/DashBoard/Card';

import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { cancelledBookingAction, getDashBoardDetailsAction, onRideBookingAction, pendingBookingAction } from '../../../redux/Actions/ADMIN_ACTIONS/DashboardAction';
import { cancelRideApi } from '../../../api/User/ApiCalls';
import BookingGraph from '../../../components/DashBoard/BookingGraph';
import RentRequestsGraph from '../../../components/DashBoard/RentRequestsGraph';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Dashboard() {
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  
  const dispatch = useDispatch()

  useEffect(() =>{
    dispatch(getDashBoardDetailsAction())
  },[])


  const details = useSelector((state) => state.getDashBoardDetailsReducer.dashBoardData)
  console.log('DASH',details);
  

  return (
    <div>
      <Box sx={{ display : 'flex' }}>
        <AdminSideBar/>
        <Box component = 'main' sx={{flexGrow : 1,p:3}}>
          <DrawerHeader/>
          <h1>Dashboard</h1>
          <Box className='d-flex justify-content-start container'>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <BasicCard 
                value={details ? details.totalUsers : ""}
                title={"Total Users"}
                desc = {"Total Registered Users"}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <BasicCard
                  value={details ? details.totalBikes : ""}
                  title={'Total Bikes'}
                  desc={"Total Accepted Bikes"}
                 />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <BasicCard 
                value={details ? details.totalBookings : ""}
                title={"Total Bookings"}
                desc={'Total Bookings Made'}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <BasicCard
                value={details ? details.totalAmountCompletedBookings : "" }
                title={"Total Rent Amount"}
                desc={'Amount received for completed rides'}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ width: '100%' }} className='mt-5'>
            <MDBContainer>
              <MDBRow>
                <MDBCol size='md'>
                  <BookingGraph
                   pending={details? details.totalPendingBookings : "="}
                    onRide={details ? details.totalOnRide : "-"} 
                    cancelled={details ? details.totalCancelled : "-"} 
                    title={'Bookings Details'}
                    
                    />
                </MDBCol>
                <MDBCol size='md'>
                  <RentRequestsGraph
                   pending={details ? details.totalPendingRequests : "-"}
                   rejected={details ? details.totalRejectedRequests : "-"}
                   accepted={details ? details.totalAcceptedRequests : "-"}
                   title={"Rent Requests Details"}
                  />
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default Dashboard