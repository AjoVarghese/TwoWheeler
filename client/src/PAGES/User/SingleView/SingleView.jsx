import React from 'react'
import Navbar from '../../../COMPONENTS/NAVBAR/Navbar'
// import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
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
  console.log("Single view Data",location.state.bikesData[0].Photo[0]);
  return (
    <div>
        <Navbar/>
       
        <Box sx={{ width: '100%' }}>
      <Stack spacing={2} style={{boxShadow:'0.5px 0.5px'}} className='mt-2'>
        <Item><h1>Single View</h1></Item>
      </Stack>
      <Card className='container mt-3'>
      <Card.Header><h3>{location.state.bikesData[0].vehicleName}</h3></Card.Header>
      <Card.Body>
        {/* <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button> */}
        <div class="row">
  <div class="col-md-7">
    {/* <h2>{location.state.bikesData[0].vehicleName}</h2> */}
  <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={location.state.bikesData[0].Photo[0]}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>{location.state.bikesData[0].vehicleName}</h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={location.state.bikesData[0].Photo[1]}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>{location.state.bikesData[0].vehicleName}</h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={location.state.bikesData[0].Photo[2]}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>{location.state.bikesData[0].vehicleName}</h3>
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
        <ListGroup.Item>Bike Name : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{location.state.bikesData[0].vehicleName}</ListGroup.Item>
        <ListGroup.Item>Bike Model : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{location.state.bikesData[0].vehicleModel}</ListGroup.Item>
        <ListGroup.Item>Brand : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{location.state.bikesData[0].Brand}</ListGroup.Item>
        <ListGroup.Item>Fuel Used : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{location.state.bikesData[0].Fuel}</ListGroup.Item>
        <ListGroup.Item>Color : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{location.state.bikesData[0].Color}</ListGroup.Item>
        <ListGroup.Item>Type : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{location.state.bikesData[0].Assured ? "Assured" : "Not Assured"}</ListGroup.Item>
        <ListGroup.Item>Price : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rs.{location.state.bikesData[0].Price}(per hr)</ListGroup.Item>
      </ListGroup>
    </Card>
    <Button variant="warning" className='mt-3 ms-2 me-2' style={{width:"100%",backgroundColor:'#fed250'}}>Book Now</Button>{' '}
  </div>
 
</div>
      </Card.Body>
    </Card>
    </Box>
    
    </div>
  )
}

export default SingleView