import { Box, Tab, Tabs, Typography, styled } from '@mui/material'
import React, { useEffect } from 'react'
import AdminSideBar from '../../../components/NAVBAR/AdminSideBar'
import PropTypes from 'prop-types';
import AllBookings from '../../../components/AdminBookings/AllBookings';
import { useDispatch, useSelector } from 'react-redux';
import { bookingDetailsAction } from '../../../redux/Actions/ADMIN_ACTIONS/bookingDetailsAction';
import OnRide from '../../../components/AdminBookings/OnRide';
import CompletedBookings from '../../../components/AdminBookings/CompletedBookings';
import PendingBookings from '../../../components/AdminBookings/PendingBookings';
import CancelledRides from '../../../components/AdminBookings/CancelledRides';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function Bookings() {
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(bookingDetailsAction())
  },[])

  const bookingDetails = useSelector((state) => state.bookingDetailsReducer.bookedDetails)

  return (
    <div>
      <Box sx={{ display : 'flex' }}>
      <AdminSideBar/>
      <Box component = 'main' sx={{flexGrow : 1,p:3}}>
        <DrawerHeader/>
        <h1>Booking Details</h1>

        <Box sx={{ width: '100%' }} className='mt-3 container'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="All Rides"  />
          <Tab label="Ongoing Rides" />
          <Tab label="Completed Rides"  ></Tab>
          <Tab label="Pending Rides"  ></Tab>
          <Tab label="Cancelled Rides"  />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>

        <AllBookings data={bookingDetails} />
     
      </TabPanel>

      <TabPanel value={value} index={1}>
        <OnRide data={bookingDetails}/>
      </TabPanel>

      <TabPanel value={value} index={2}>
         <CompletedBookings data={bookingDetails}/>
      </TabPanel>

      <TabPanel value={value} index={3}>
        <PendingBookings data={bookingDetails}/>
      </TabPanel>

      <TabPanel value={value} index={4}>
         <CancelledRides data={bookingDetails}/>
      </TabPanel>
    </Box>
      </Box>
      </Box>
    </div>
  )
}

export default Bookings