import React, { useEffect, useState } from 'react'
import Navbar from '../../../COMPONENTS/NAVBAR/Navbar'
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBListGroup,
  MDBListGroupItem,
  MDBCardLink,
  MDBContainer,
  MDBIcon
} from 'mdb-react-ui-kit';
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button';
// import './Bikes.css'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../COMPONENTS/Loading/Loading'
import { getBikesAction } from '../../../REDUX/Actions/USER_ACTIONS/getBikesAction';
import { width } from '@mui/system';
import { useNavigate } from 'react-router-dom';

// import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { bikeSearchAction } from '../../../REDUX/Actions/USER_ACTIONS/bikeSearchAction';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Bikes() {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const [searchTerm,setSearchTerm] = useState('')

  const bikes = useSelector((state) => state.bikesReducer)
  const {loading , bikesData , bikesDataError} = bikes
  console.log("BIKES",bikesData);

  useEffect(() => {
     dispatch(getBikesAction())
  },[])

  const submitHandler = (e) => {
    e.preventDefault()
    console.log("searchTerm",searchTerm);
    dispatch(bikeSearchAction(searchTerm))
    setSearchTerm('')
    console.log("BIKES",bikesData);
  }
  return (
       <>
         <Navbar/>
         {/* <section className='bikes'> */}
           
         {/* <div class="input-group">
  <div class="form-outline">
    <input id="search-input" type="search"  class="form-control" />
    <label class="form-label" for="form1">Search</label>
  </div>
  <button id="search-button" type="button" class="btn btn-primary">
    <i class="fas fa-search"></i>
  </button>
</div> */}
           <form action="" className='container'
            onSubmit={submitHandler}>
           <div className ="input-group container fluid" 
           style={{float : 'right'}}
          
            >
           
             <input type="search" class="form-control rounded" 
             placeholder="Search bikes... " 
             value={searchTerm}
             aria-label="Search" 
             aria-describedby="search-addon" 
             onChange={(e) => setSearchTerm(e.target.value)}
             />
              <button type="submit" class="btn btn-outline-primary"
              
              >search</button>
              
           </div>
           </form>
           <div className='cards mt-5'>
       <div>
    <MDBContainer  className="my-1">
   
<Box sx={{ flexGrow: 1 }}>
      {/* <Grid container spacing={3}>
        <Grid item xs>
          <Item>xs</Item>
        </Grid>
        <Grid item xs={6}>
          <Item></Item>
        </Grid>
        <Grid item xs>
          <Item>xs</Item>
        </Grid>
      </Grid> */}
    </Box>
      <MDBRow className="col-xs-6">
        {
          loading ? <Loading/> : 
            bikesData ? bikesData.map((x,i) => {
              return (
                <MDBCol md="3 mt-3">
                <MDBCard className="text-black">
                  <MDBIcon fab icon="apple" size="md" className="px-3 pt-3 pb-2" />
                  <MDBCardImage
                  className='d-flex justify-content-center'
                    src={x.Photo[0]}
                    style={{width:'20rem',height:'10rem',}}
                    position="top"
                    alt="Apple Computer"
                    onClick={(e) => navigate('/bike-detailed-view',{state:{bikesData}})}
                  />
                  <MDBCardBody style={{backgroundColor : "#DCDCDC"}}>
                    <div className="text-center">
                      <MDBCardTitle>{x.vehicleName}</MDBCardTitle>
                      <p className="text-muted mb-4">{x.Description}</p>
                    </div>
                    <div>
                      <div className="d-flex justify-content-between">
                        <span>Model</span>
                        <span>{x.vehicleModel}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Brand</span>
                        <span>{x.Brand}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Color</span>
                        <span>{x.Color}</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between total font-weight-bold mt-4">
                      <span>Rent Amount(per hr)</span>
                      <span>Rs.{x.Price}</span>
                    </div>
                    <div className='mt-3'>
                    <button type="button" style={{width : "100%",backgroundColor: '#fed250',borderRadius : '6px',height : '3rem',border : 'none'}}>Book Now</button>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>       
              )
            }) : ''
        }
      </MDBRow>
    </MDBContainer>
    </div>    
                
           </div>

         {/* </section> */}
       </>   
  
  )
}

export default Bikes