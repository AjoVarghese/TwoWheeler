import React, { useState } from 'react'
import Navbar from '../../../components/NAVBAR/Navbar'
// import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Carousel from 'react-bootstrap/Carousel';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function SingleView() {

  const location = useLocation()
  const navigate = useNavigate()
  const [modal,setModal] = useState(false)
  const [pickTime,setpickTime] = useState(null)
  const [dropTime,setDropTime] = useState(null)

  const {bikesData,bikeId,bikes} = location.state
  console.log("LOCAION>STATE",location.state);

  const clickedBike = bikesData?.data.find((bike) => bike._id === bikeId) || bikes.find((bike) => bike._id === bikeId)
 
 
  return (
    <div>
      
        <Navbar/>    
        <Box sx={{ width: '100%' }}>
      <Stack spacing={2} style={{boxShadow:'0.5px 0.5px'}} className='mt-2'>
        <Item><h1>Single View</h1></Item>
      </Stack>
      <Card className='container mt-3'>
      <Card.Header><h3>{clickedBike.vehicleName}</h3></Card.Header>
      <Card.Body>
        <div class="row">
  <div class="col-md-7">
 
  <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={clickedBike.Photo[0]}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>{clickedBike.vehicleName}</h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={clickedBike.Photo[1]}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>{clickedBike.vehicleName}</h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={clickedBike.Photo[2]}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>{clickedBike.vehicleName}</h3>
          <p>
           
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  </div>
  <div class="col-md-5 mt-3">
  <Card style={{ width: '22rem' }}>
      <Card.Header><h3>Details</h3></Card.Header>
      <ListGroup variant="flush">&nbsp;
        <ListGroup.Item>Bike Name : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{clickedBike.vehicleName}</ListGroup.Item>
        <ListGroup.Item>Bike Model : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{clickedBike.vehicleModel}</ListGroup.Item>
        <ListGroup.Item>Brand : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{clickedBike.Brand}</ListGroup.Item>
        <ListGroup.Item>Fuel Used : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{clickedBike.Fuel}</ListGroup.Item>
        <ListGroup.Item>Color : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{clickedBike.Color}</ListGroup.Item>
        <ListGroup.Item>Type : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{clickedBike.Assured ? "Assured" : "Not Assured"}</ListGroup.Item>
        <ListGroup.Item>Price : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rs.{clickedBike.Price}(per hr)</ListGroup.Item>
      </ListGroup>
    </Card>
    <Button variant="warning" className='mt-3 ms-2 me-2' 
    style={{width:"100%",backgroundColor:'#fed250'}}
    onClick={() => {
    
      navigate('/booking-summary',{state : {bikesData,bikeId,bikes}})
      
    }}
    >Book Now</Button>{' '}
  </div>
</div>
      </Card.Body>
    </Card>
    </Box>
    
    </div>
  )
}

export default SingleView