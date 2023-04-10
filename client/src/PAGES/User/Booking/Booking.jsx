import React from 'react'
import Navbar from '../../../components/NAVBAR/Navbar'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Booking() {
  return (
    <div>
         <Navbar/>
         <Box sx={{ width: 1 }} className='container mt-4'>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2} >
        <Box gridColumn="span 8">
          <Item>
            <h3>SUMMARY</h3>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                 <Item>xs</Item>
               </Grid>
               <Grid item xs={6}>
                  <Item>xs=6</Item>
                </Grid>
                {/* <Grid item xs>
                   <Item>xs</Item>
                 </Grid> */}
                </Grid>
            </Item>
        </Box>
        <Box gridColumn="span 4">
          <Item>
            <h3>CHECKOUT</h3>
          </Item>
        </Box>
        {/* <Box gridColumn="span 4">
          <Item>xs=4</Item>
        </Box>
        <Box gridColumn="span 8">
          <Item>xs=8</Item>
        </Box> */}
      </Box>
    </Box>
    </div>
  )
}

export default Booking