import React from 'react'
import Navbar from '../../../components/NAVBAR/Navbar'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, Grid, TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { MDBCard, MDBCardHeader, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Booking() {
  const location = useLocation()
  console.log("location",location.state);
  const {bikesData,bikeId} = location.state
  const selectedBike = bikesData.find((bike) => bike._id === bikeId)
  console.log('selected',selectedBike);
  return (
    <div>
         <Navbar/>
         <Box sx={{ width: 1 }} className='container mt-5'>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2} >
        <Box gridColumn="span 8">
          <Item>
            <h3 style={{textAlign : "start"}}>SUMMARY</h3>
            <Grid container spacing={3} className='mt-3'>
              <Grid item md={5} xs={6} lg={5}>
                 <Item>
                 <figure className='figure'>
      <img
        src={selectedBike.Photo[0]}
        className='figure-img img-fluid rounded shadow-3 mb-3'
        alt='...'
      />
      <figcaption className='figure-caption'><h4>{selectedBike.vehicleName}</h4></figcaption>
    </figure>
                 </Item>
               </Grid>
              
               <Grid item md={7} xs={6} className='col-md-6'>
                  <Item>
                 <h3>Details</h3>
                  <MDBCard>
      <MDBListGroup flush>
        <MDBListGroupItem>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 12, sm: 6, md: 6 }}>
  <Grid item xs={12} md={6} lg={6}>
    
     <h5> Pickup Date</h5>
      <p>erer</p>
      <p>time</p>
  </Grid>
  <Grid item xs={12} md={6} lg={6}>
 
     <h5> Drop Date</h5>
      <p>erer</p>
      <p>time</p>
   
  </Grid>
</Grid>
        </MDBListGroupItem>
        <MDBListGroupItem >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 12, sm: 6, md: 6 }}>
  <Grid item xs={12} md={6} lg={6}>
    
     <h5>Location</h5>
  </Grid>
  <Grid item xs={12} md={6} lg={6}>

     <h5> {selectedBike.Location}</h5>
      
  </Grid>
</Grid>
        </MDBListGroupItem>
        <MDBListGroupItem>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 12, sm: 6, md: 6 }}>
  <Grid item xs={12} md={6} lg={6}>
    
     <h5> Price</h5>
     
  </Grid>
  <Grid item xs={12} md={6} lg={6}>
     <h5> Rs.{selectedBike.Price}</h5>
     
  </Grid>
</Grid>
        </MDBListGroupItem>
      </MDBListGroup>
    </MDBCard>
                  </Item>
                </Grid>
                </Grid>
                {/* <TextField id="standard-basic" label="Standard" variant="standard" />
            <button>sdsd</button> */}

            </Item>
        </Box>
        
        <Box gridColumn="span 4">
          <Item>
            
            <MDBCard>
      <MDBCardHeader><h3>CHECKOUT</h3></MDBCardHeader>
      <MDBListGroup flush>
        <MDBListGroupItem>Cras justo odio</MDBListGroupItem>
        <MDBListGroupItem>Dapibus ac facilisis in</MDBListGroupItem>
        <MDBListGroupItem>Vestibulum at eros</MDBListGroupItem>
      </MDBListGroup>
    </MDBCard>
    <Button  style={{backgroundColor :"#fed250",color : "black",width : '100%'}} className='mt-4'>Checkout</Button>
          </Item>
        </Box>
        
      </Box>
    </Box>
    </div>
  )
}

export default Booking