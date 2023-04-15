import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/NAVBAR/Navbar'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { MDBCard, MDBCardHeader, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import { DatePicker } from "antd"
import moment from "moment"
import { useDispatch, useSelector } from 'react-redux';
import { bookingAction } from '../../../redux/Actions/USER_ACTIONS/bookingAction';
import { getCouponsApi } from '../../../api/Admin/ApiCalls';
import { getCoupons } from '../../../redux/Actions/ADMIN_ACTIONS/couponActions';
import { getWalletAction } from '../../../redux/Actions/USER_ACTIONS/getWalletAction';
import WalletBookingSuccess from '../../../components/Modal/WalletBookingSuccess';


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
    const [coupon,setCoupon] = useState(null)
    const [couponVerified,setCouponVerified] = useState(false)
    const [couponApplied,setCouponApplied] = useState(false)
    const [offer,setOffer] = useState()
    const [wallet,setWallet] = useState(false)
    const [walletError,setWalletError] = useState(false)
    const [stripe,setStripe] = useState(false)
    const [error,setError] = useState(false)
    const [modal,setModal] = useState(false)
    const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const {bikesData,bikeId} = location.state
  const selectedBike = bikesData.find((bike) => bike._id === bikeId)

  useEffect(() => {
    dispatch(getCoupons())
    dispatch(getWalletAction())
  },[])

  const coupons = useSelector((state) => state.getCouponReducer.couponData)
  console.log('ALl COUPONS',coupons);

  const walletAmount = useSelector((state) => state.getWalletReducer.walletData)
  
  
  const bookingData = useSelector((state) => state.bookingReducer)
  const {loading,bookingSuccessData,bookingError} = bookingData

  const walletBooking = useSelector((state) => state.bookingReducer.walletBookingSuccess)
  console.log('walletBookinf',walletBooking)

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
  let userId = JSON.parse(localStorage.getItem("userInfo")).id
  

  if(checkCoupon){
    let filteredCoupons = coupons.filter(x => x.couponCode === coupon)
    if(filteredCoupons.length > 0) {
      filteredCoupons.forEach(coupon => {
        if (coupon.users.some(user => user.userId === userId)) {
          console.log(` has already applied coupon `);
          setCouponApplied(true)
          setError(false)
        } else {
          console.log(` has not applied coupon  yet`);
          setCouponApplied(false)
          setCouponVerified(true)
          setError(false)
          setOffer(coupons.find(x => x.couponCode === coupon)?.couponPrice || 0)
          console.log('offer',offer);
        }
      });
    } else {
      console.log("Nothing found");
    }
    
    
  } else {
    setCouponVerified(false)
    setCouponApplied(false)
    setError(true)
  }
} 

let totalAmount =   needHelmet === true && couponVerified === true ? 
                    (totalHours * selectedBike.Price + 50) - (coupons.find(x => x.couponCode === coupon)?.couponPrice || 0) : 
                     needHelmet === true ? totalHours * selectedBike.Price +50 : 
                    needHelmet === false && couponVerified === true ? (totalHours * selectedBike.Price) - (coupons.find(x => x.couponCode === coupon)?.couponPrice || 0) 
                     :totalHours * selectedBike.Price

const stripeData = {
  user : JSON.parse(localStorage.getItem("userInfo")).id,
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
  couponCode : coupon,
  paymentType : "Stripe"
}

const walletBookingData = {
  user : JSON.parse(localStorage.getItem("userInfo")).id,
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
  couponCode : coupon,
  paymentType : "Wallet",
  walletId : walletAmount?._id
}

const handleCheckout = () => {
  if(wallet === false && stripe === true){
    setWalletError(false)
    dispatch(bookingAction(stripeData))
  } else if(wallet === true && stripe === false) {
    console.log(totalAmount);
    console.log(walletAmount.walletAmount);
    if(walletAmount.walletAmount >= totalAmount) {
      
      setWalletError(false)
      dispatch(bookingAction(walletBookingData))
    }else {
      setWalletError(true)
    }
    
  }
  
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
          {
            bookingError ? <p style={{color : "red"}}>{bookingError}</p> : ""
          }
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
           {
            error ? <p style={{color : 'red'}}>Coupon Code is not valid</p> : ""
           }
           {
            couponApplied ? <p style={{color : 'red'}}>Coupon Has Already Applied</p> : ""
           }
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
    
     <h5>Total Amount : </h5>
     
  </Grid>
  <Grid item xs={12} md={6} lg={6}>
    <h5>Rs. 
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
  
  {/* {
    walletBooking ? <WalletBookingSuccess open={modal} onClose={()=>setModal(false)} message={walletBooking}/> : ""
  } */}

  {/* {
    walletBooking === 'Booking Successfull' ? navigate('/my-rents') : ""
  } */}
  
</Grid>
        </MDBListGroupItem>
      
     
    </MDBCard>
    <Grid item xs={12} md={6} lg={6}>
    <FormControl>
      {/* <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel> */}
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="wallet" 
        control={<Radio />}  
        label="Wallet Payment" 
        onChange={() => {
           setWallet(true)
           setStripe(false)
        }}/>
        {
          walletError ? <p style={{color : "red"}}>Insufficient Amount</p> : ""
        }
        <FormControlLabel value="stripe" 
        control={<Radio />} 
        label="Stripe Payment" 
        onChange={() => {
          setStripe(true)
          setWallet(false)
          setWalletError(false)
        }}/>
      </RadioGroup>
    </FormControl>
  </Grid>
  {
    wallet || stripe ?  <Button  style={{backgroundColor :"#fed250",color : "black",width : '100%'}} 
    className='mt-4'
    onClick={handleCheckout}
    >Checkout</Button> : <Button  style={{backgroundColor :"#fed250",color : "black",width : '100%'}} 
    className='mt-4'
    disabled
    // onClick={handleCheckout}
    >Checkout</Button>
   
    
  }
   
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