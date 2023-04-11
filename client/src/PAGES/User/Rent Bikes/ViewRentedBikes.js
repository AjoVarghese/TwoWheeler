import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../../../components/NAVBAR/Navbar'
import { getAccepted, getAcceptedDataAction, getPending, getPendingDataAction, getRejected, getRejectedDataAction, getRentedBikesAction } from '../../../redux/Actions/USER_ACTIONS/getRentedBikes'
import Figure from 'react-bootstrap/Figure';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import AllBikes from '../../../components/RentedBikes/AllBikes';
import AcceptedRents from '../../../components/RentedBikes/AcceptedRents';
import Pending from '../../../components/RentedBikes/Pending';
import RejectedRequests from '../../../components/RentedBikes/RejectedRequests';


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

function ViewRentedBikes() {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Navbar/>
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2} className='mt-3'>
        <Item><h3>Rented Bikes</h3></Item>
      </Stack>
    </Box>

    <Box sx={{ width: '100%' }} className='mt-3 container'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="All "  />
          
          <Tab label="Accepted Requests"  ></Tab>
          <Tab label="Pending Requests"  />
          <Tab label="Rejected Requests"  />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>

        <AllBikes/>
     
      </TabPanel>


      <TabPanel value={value} index={1}>

        <AcceptedRents/>
      
      </TabPanel>


      <TabPanel value={value} index={2}>

        <Pending/>

      </TabPanel>
      <TabPanel value={value} index={3}>

        <RejectedRequests/>

      </TabPanel>
    </Box>
    </>
  )
}

export default ViewRentedBikes