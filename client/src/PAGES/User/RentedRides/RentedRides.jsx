import Paper from '@mui/material/Paper';
import { Box, Stack, Tab, Tabs, Typography, styled } from '@mui/material'
import React, { useEffect } from 'react'
import Navbar from '../../../components/NAVBAR/Navbar';
import PropTypes from 'prop-types';
import AllRides from '../../../components/RentedRides/AllRides';
import CompletedRides from '../../../components/RentedRides/CompletedRides';
import CancelledRides from '../../../components/RentedRides/CancelledRides';
import { useDispatch, useSelector } from 'react-redux';
import { rentedRidesAction } from '../../../redux/Actions/USER_ACTIONS/getRentedRides';
import OnRide from '../../../components/RentedRides/OnRide';
import PendingRides from '../../../components/RentedRides/PendingRides';

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



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function RentedRides() {

      const [value, setValue] = React.useState(0);

      const handleChange = (event, newValue) => {
        setValue(newValue);
      };

      const dispatch = useDispatch()
      
  useEffect(() => {
    dispatch(rentedRidesAction())
  },[])

  const rentedRides = useSelector((state) => state.rentedBikesReducer.rentedRidesData)
      console.log(rentedRides ? rentedRides : "");

  return (
    <div>
        <Navbar/>
        <Box sx={{ width: '100%' }}>
        <Stack spacing={2} className='mt-3'>
        <Item><h3>Your Rides</h3></Item>
      </Stack>
        </Box>

        <Box sx={{ width: '100%' }} className='mt-3 container'>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="All "  />
          
          <Tab label="On Ride"  ></Tab>
          <Tab label="Completed Rides"  />
          <Tab label="Pending Rides"  />
          <Tab label="Cancelled Rides"  />
        </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
           <AllRides data={rentedRides}/>
      </TabPanel>

      <TabPanel value={value} index={1}>
           
           <OnRide data={rentedRides}/>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <CompletedRides data={rentedRides}/>
      </TabPanel>

      <TabPanel value={value} index={3}>
           <PendingRides data={rentedRides}/>
      </TabPanel>

      <TabPanel value={value} index={4}>
           <CancelledRides data={rentedRides}/>
      </TabPanel>
        </Box>
    </div>
  )
}

export default RentedRides