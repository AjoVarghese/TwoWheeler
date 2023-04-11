import Paper from '@mui/material/Paper';
import { Box, Stack, Tab, Tabs, Typography, styled } from '@mui/material'
import React from 'react'
import Navbar from '../../../components/NAVBAR/Navbar';
import PropTypes from 'prop-types';
import AllRides from '../../../components/RentedRides/AllRides';
import CompletedRides from '../../../components/RentedRides/CompletedRides';
import PendingRides from '../../../components/RentedRides/PendingRides';
import CancelledRides from '../../../components/RentedRides/CancelledRides';

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
          
          <Tab label="Pending Rides"  ></Tab>
          <Tab label="Completed Rides"  />
          <Tab label="Cancelled Rides"  />
        </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
           <AllRides/>
      </TabPanel>

      <TabPanel value={value} index={1}>
           <CompletedRides/>
      </TabPanel>

      <TabPanel value={value} index={2}>
           <PendingRides/>
      </TabPanel>

      <TabPanel value={value} index={3}>
           <CancelledRides/>
      </TabPanel>
        </Box>
    </div>
  )
}

export default RentedRides