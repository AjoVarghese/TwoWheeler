import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/NAVBAR/Navbar'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, Checkbox, Grid, TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { MDBCard, MDBCardHeader, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import { DatePicker } from "antd"
import moment from "moment"
import { useDispatch, useSelector } from 'react-redux';
import { bookingAction } from '../../../redux/Actions/USER_ACTIONS/bookingAction';
import { getCouponsApi } from '../../../api/Admin/ApiCalls';
import { getCoupons } from '../../../redux/Actions/ADMIN_ACTIONS/couponActions';


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
    const [coupon,setCoupon] = useState('')
    const [couponVerified,setCouponVerified] = useState(false)
    const [offer,setOffer] = useState()

  const dispatch = useDispatch()
  const location = useLocation()

  const {bikesData,bikeId} = location.state
  const selectedBike = bikesData.find((bike) => bike._id === bikeId)

  useEffect(() => {
    dispatch(getCoupons())
  },[])

  const coupons = useSelector((state) => state.getCouponReducer.couponData)
  console.log(coupons);


  const selectTimeSlots = (value) => {
    // console.log(moment(value));
    // console.log(moment(value[0].$d));
    // console.log(moment(value[1].$d));
    // console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
    // console.log(moment(value[0].$d).format('DD MM YYYY hh:mm '));
    // console.log(moment(value[1].$d).format('MMMM Do YYYY, h:mm:ss a'));
    setStartDate(moment(value[0].$d).format('MMMM Do YYYY, h:mm:ss a'));
    setEndDate(moment(value[1].$d).format('MMMM Do YYYY, h:mm:ss a'));
    setTotalHours(value[1].diff(value[0], 'hours'))
}

const verifyCoupon = (coupon) => {
  let checkCoupon = coupons.find(check => check.couponCode === coupon)

  if(checkCoupon){
    console.log('yess');
    setCouponVerified(true)
    setOffer(coupons.find(x => x.couponCode === coupon)?.couponPrice || 0)
    console.log('offer',offer);
  } else {
    console.log('noo');
    setCouponVerified(false)
  }
} 

let totalAmount =   needHelmet === true && couponVerified === true ? 
                    (totalHours * selectedBike.Price + 50) - (coupons.find(x => x.couponCode === coupon)?.couponPrice || 0) : 
                     needHelmet === true ? totalHours * selectedBike.Price +50 : 
                    needHelmet === false && couponVerified === true ? (totalHours * selectedBike.Price) - (coupons.find(x => x.couponCode === coupon)?.couponPrice || 0) 
                     :totalHours * selectedBike.Price

console.log('coupon',coupon);

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
  location : selectedBike.Location,
  couponCode : coupon
  
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
          <Box style={{textAlign: "start"}} className='mt-2'>
          
           <TextField id="standard-basic"
            label="Apply Coupon" variant="standard"
            onChange={(e) => setCoupon(e.target.value)}
             />
           <Button variant="contained" 
           className='mt-3 ms-2'
          onClick={(e) => {
            verifyCoupon(coupon)
          }}
           >Apply Coupon</Button>
          </Box>

          <Box  className='mt-3 ms-2'>
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

  {
    couponVerified === true ?
    <>
    <Grid item xs={12} md={6} lg={6}>
    
     <h5>Coupon offer : </h5>
     
  </Grid>
  <Grid item xs={12} md={6} lg={6}>
    <h5>-Rs.
    {
            coupons.find(x => x.couponCode === coupon)?.couponPrice || 0
            
    }
    </h5>
    
     
  </Grid> 
  </> : ""
  }

  <Grid item xs={12} md={6} lg={6}>
    
     <h5>Rs.Total Amount : </h5>
     
  </Grid>
  <Grid item xs={12} md={6} lg={6}>
    <h5>
    {
      // needHelmet === true ? totalHours * selectedBike.Price +50 : totalHours * selectedBike.Price
      needHelmet === true && couponVerified === true ? 
      (totalHours * selectedBike.Price + 50) - (coupons.find(x => x.couponCode === coupon)?.couponPrice || 0) : 
       needHelmet === true ? totalHours * selectedBike.Price +50 : 
       needHelmet === false && couponVerified === true ? (totalHours * selectedBike.Price) - (coupons.find(x => x.couponCode === coupon)?.couponPrice || 0) 
       :totalHours * selectedBike.Price
       
      //  totalHours * selectedBike.Price
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
         
    </div>
  )
}

export default Booking