import React, { useState } from 'react'
import Navbar from '../../../components/NAVBAR/Navbar'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, Checkbox, Grid, TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { MDBCard, MDBCardHeader, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import { DatePicker } from "antd"
import moment from "moment"
import { useDispatch } from 'react-redux';
import { bookingAction } from '../../../redux/Actions/USER_ACTIONS/bookingAction';


const { RangePicker } = DatePicker

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Booking() {
  const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [totalHours, setTotalHours] = useState(0)
    const [needHelmet, setNeedHelmet] = useState(false)

  const dispatch = useDispatch()
  const location = useLocation()
  console.log("location",location.state);
  const {bikesData,bikeId} = location.state
  const selectedBike = bikesData.find((bike) => bike._id === bikeId)
  console.log('selected',selectedBike);

  const selectTimeSlots = (value) => {
    // console.log(moment(value));
    // console.log(moment(value[0].$d));
    // console.log(moment(value[1].$d));
    console.log(moment(value[0].$d).format('DD MM YYYY hh:mm '));
    console.log(moment(value[1].$d).format('DD MM YYYY hh:mm '));
    setStartDate(moment(value[0].$d).format('DD MM YYYY hh:mm A'));
    setEndDate(moment(value[1].$d).format('DD MM YYYY hh:mm A'));
    setTotalHours(value[1].diff(value[0], 'hours'))
}

let totalAmount =  needHelmet === true ? totalHours * selectedBike.Price +50 : totalHours * selectedBike.Price

const bookingData = {
  userId : JSON.parse(localStorage.getItem("userInfo")).id,
  userName : JSON.parse(localStorage.getItem("userInfo")).Name,
  bikeId : selectedBike._id,
  bikeDetails :selectedBike,
  totalHours,
  totalAmount,
  needHelmet : needHelmet,
  bookedTimeSlots : {
    startDate,
    endDate
  },
  location : selectedBike.Location
}
 
const handleCheckout = () => {
  dispatch(bookingAction(bookingData))
}
  return (
    <div>
         <Navbar/>
         <Box sx={{ flexGrow: 1 }} className='container mt-5'>
      <Grid container spacing={2}>
        <Grid item xs={6} md={6}>
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
        <Grid item xs={6} md={6}>
          <Item>
          <Box style={{textAlign:"start"}}>
          <h3 >Select Time Slot</h3>
          <RangePicker showTime={{format: "HH:mm"}} 
          format='MM DD YYYY HH:mm'
          onChange={selectTimeSlots}
          />
          </Box>
          <Box style={{textAlign: "start"}} className='mt-2'>
           
            <Checkbox
            
            {...label}
            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
            onChange={(e) => {
              if(e.target.checked){
                setNeedHelmet(true)
              } else {
                setNeedHelmet(false)
              }
            }}
             />Need Extra helmet for ride?
          </Box>
          <Box>
          {
          startDate && endDate ? <Box gridColumn="span 4">
          <Item>
            
            <MDBCard>
            <MDBCardHeader><h3>CHECKOUT</h3></MDBCardHeader>
        <MDBListGroupItem >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 12, sm: 6, md: 6 }}>
  <Grid item xs={12} md={6} lg={6}>
    
     <h5>Location :</h5>
  </Grid>
  <Grid item xs={12} md={6} lg={6}>

     <h5> {selectedBike.Location}</h5>
      
  </Grid>
</Grid>
 {
  needHelmet === true ? <Grid container rowSpacing={1} columnSpacing={{ xs: 12, sm: 6, md: 6 }}>
  <Grid item xs={12} md={6} lg={6}>
    
     <h5>Extra Helmet :</h5>
  </Grid>
  <Grid item xs={12} md={6} lg={6}>

     <h5> Rs.50</h5>
      
  </Grid>
</Grid> : ""
 }

        </MDBListGroupItem>
        <MDBListGroupItem>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 12, sm: 6, md: 6 }}>
  <Grid item xs={12} md={6} lg={6}>
    
     <h5> Price/hr : </h5>
     
  </Grid>
  <Grid item xs={12} md={6} lg={6}>
     <h5> Rs.{selectedBike.Price}</h5>
     
  </Grid>
</Grid>
        </MDBListGroupItem>

        <MDBListGroupItem>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 12, sm: 6, md: 6 }}>
  <Grid item xs={12} md={6} lg={6}>
    
     <h5>Total Hrs : </h5>
     
  </Grid>
  <Grid item xs={12} md={6} lg={6}>
     <h5>{totalHours}hr</h5>
     
  </Grid>

  <Grid item xs={12} md={6} lg={6}>
    
     <h5>Rs.Total Amount : </h5>
     
  </Grid>
  <Grid item xs={12} md={6} lg={6}>
    <h5>
    {
      needHelmet === true ? totalHours * selectedBike.Price +50 : totalHours * selectedBike.Price
    }
    </h5>
    
     
  </Grid>
  
</Grid>
        </MDBListGroupItem>
      
     
    </MDBCard>
    <Button  style={{backgroundColor :"#fed250",color : "black",width : '100%'}} 
    className='mt-4'
    onClick={handleCheckout}
    >Checkout</Button>
          </Item>
        </Box> : ""
        }
          </Box>
          </Item>
        </Grid>
       
      </Grid>
    </Box>
         {/* <Box sx={{ width: 1 }} className='container mt-5'>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2} >
      <Box sx={{ width: '100%' }}>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </Box>
    </Box> */}
        {/* <Box gridColumn="span 8">
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
                
                  <MDBCard>
                    
      <MDBListGroup flush>
     
        <MDBListGroupItem>
          <Box>
          <h3 style={{textAlign:"start"}}>Select Time Slot</h3>
          <RangePicker showTime={{format: "HH:mm"}} 
          format='MM DD YYYY HH:mm'
          onChange={selectTimeSlots}
          />
          </Box>
          <Box style={{textAlign: "start"}}>
           
            <Checkbox
            
            {...label}
            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
            onChange={(e) => {
              if(e.target.checked){
                setNeedHelmet(true)
              } else {
                setNeedHelmet(false)
              }
            }}
             />Need Extra helmet for ride?
          </Box>
        
        </MDBListGroupItem>
       
      </MDBListGroup>
    </MDBCard>
                  </Item>
                </Grid>
                </Grid>
              

            </Item>
        </Box>
        {
          startDate && endDate ? <Box gridColumn="span 4">
          <Item>
            
            <MDBCard>
            <MDBCardHeader><h3>CHECKOUT</h3></MDBCardHeader>
        <MDBListGroupItem >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 12, sm: 6, md: 6 }}>
  <Grid item xs={12} md={6} lg={6}>
    
     <h5>Location :</h5>
  </Grid>
  <Grid item xs={12} md={6} lg={6}>

     <h5> {selectedBike.Location}</h5>
      
  </Grid>
</Grid>
 {
  needHelmet === true ? <Grid container rowSpacing={1} columnSpacing={{ xs: 12, sm: 6, md: 6 }}>
  <Grid item xs={12} md={6} lg={6}>
    
     <h5>Extra Helmet :</h5>
  </Grid>
  <Grid item xs={12} md={6} lg={6}>

     <h5> Rs.50</h5>
      
  </Grid>
</Grid> : ""
 }

        </MDBListGroupItem>
        <MDBListGroupItem>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 12, sm: 6, md: 6 }}>
  <Grid item xs={12} md={6} lg={6}>
    
     <h5> Price/hr : </h5>
     
  </Grid>
  <Grid item xs={12} md={6} lg={6}>
     <h5> Rs.{selectedBike.Price}</h5>
     
  </Grid>
</Grid>
        </MDBListGroupItem>

        <MDBListGroupItem>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 12, sm: 6, md: 6 }}>
  <Grid item xs={12} md={6} lg={6}>
    
     <h5>Total Hrs : </h5>
     
  </Grid>
  <Grid item xs={12} md={6} lg={6}>
     <h5>{totalHours}hr</h5>
     
  </Grid>

  <Grid item xs={12} md={6} lg={6}>
    
     <h5>Rs.Total Amount : </h5>
     
  </Grid>
  <Grid item xs={12} md={6} lg={6}>
    <h5>
    {
      needHelmet === true ? totalHours * selectedBike.Price +50 : totalHours * selectedBike.Price
    }
    </h5>
    
     
  </Grid>
  
</Grid>
        </MDBListGroupItem>
      
     
    </MDBCard>
    <Button  style={{backgroundColor :"#fed250",color : "black",width : '100%'}} 
    className='mt-4'
    onClick={handleCheckout}
    >Checkout</Button>
          </Item>
        </Box> : ""
        }
         */}
{/*         
      </Box>
    </Box> */}
    </div>
  )
}

export default Booking