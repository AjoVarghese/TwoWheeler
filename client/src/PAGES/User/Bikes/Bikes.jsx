import React, { useEffect } from 'react'
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

  const bikes = useSelector((state) => state.bikesReducer)
  const {loading , bikesData , bikesDataError} = bikes
  console.log("BIKES",bikesData);

  useEffect(() => {
     dispatch(getBikesAction())
  },[])
  return (
       <>
         <Navbar/>
         <section className='bikes'>
           <div className='cards'>
           
    <MDBContainer  className="my-2">
    <div class="input-group " style={{float : 'right'}}>
  <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
  <button type="button" class="btn btn-outline-primary">search</button>
</div>
<Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Item>xs</Item>
        </Grid>
        <Grid item xs={6}>
          <Item></Item>
        </Grid>
        <Grid item xs>
          <Item>xs</Item>
        </Grid>
      </Grid>
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
                    style={{width:'18rem',height:'10rem '}}
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

         </section>
       </>   
  
  )
}

export default Bikes