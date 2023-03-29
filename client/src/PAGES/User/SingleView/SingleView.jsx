import React from 'react'
import Navbar from '../../../COMPONENTS/NAVBAR/Navbar'
// import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';


  

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
function SingleView() {

  const location = useLocation()
  console.log("Single view Data",location.state.bikesData[0]);
  return (
    <div>
        <Navbar/>
       
        <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <Item><h1>Single View</h1></Item>
        {/* <Item>Item 2</Item>
        <Item>Item 3</Item> */}
      </Stack>
    </Box>
    
    </div>
  )
}

export default SingleView