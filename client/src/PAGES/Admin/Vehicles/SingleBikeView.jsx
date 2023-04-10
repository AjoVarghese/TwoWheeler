import React, { useEffect } from 'react'
import { Box, Grid, styled } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import AdminSideBar from '../../../components/NAVBAR/AdminSideBar';
import { Card} from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { bikeSingleViewAction } from '../../../redux/Actions/ADMIN_ACTIONS/bikeSingleViewAction';
import './SingleBikeView.css'
import { bikeViewAction } from '../../../redux/Actions/ADMIN_ACTIONS/bikeViewAction';



function SingleBikeView() {
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));
 

    const dispatch = useDispatch()


    // const bike = useSelector((state) => state.singleBikeReducer.singleBikeData)
    // console.log("BIKE",bike);

    // useEffect(() => {
    //   dispatch(bikeViewAction(bike._id))
    // },[])
  return (
    // <div className='d-flex justify-content-center c' >
    //      <Box sx={{ display : 'flex' }}>
    //   <AdminSideBar/>
    //   <Box component = 'main' sx={{flexGrow : 1,p:3}}>
    //     <DrawerHeader/>
        
    //     <Card className='col-md-12' style={{width :'40rem'}}>
    //     <Card.Text>
    //        <div className='me-4 mt-3' style={{float : 'right'}}>
    //          More
    //        </div>
    //       </Card.Text>
    //     <Card.Img variant="top" src={bike.Photo[0]} />
    //     <Card.Body>
    //       <Card.Text>
    //         Some quick example text to build on the card title and make up the
    //         bulk of the card's content.
    //         <Container fluid>
    //   <Row className='mt-3'>
    //     <Col><h3>Vehicle :{bike.vehicleName}</h3> </Col>
    //   </Row>
    // </Container>
    //         <Stack direction="horizontal" gap={3} className = 'mt-3'>
    //   <div className="bg-light border ms-auto">{bike.Brand}</div>
    //   <div className="bg-light border ms-auto">Model :{bike.vehicleModel}</div>
    //   <div className="vr" />
    //   <div className="bg-light border">EngineNo : {bike.EngineNo}</div>
    // </Stack>
    // <Stack direction="horizontal" gap={3} className = 'mt-3'>
    //   <div className="bg-light border ms-auto">Price : {bike.Price}/hr</div>
    //   <div className="bg-light border ms-auto">Fuel Used :{bike.Fuel}</div>
    //   <div className="vr" />
    //   <div className="bg-light border">Color : {bike.Color}</div>
    // </Stack>
    // <Stack direction="horizontal" gap={3} className = 'mt-3'>
    //   <div className="bg-light border ms-auto">Assured : {bike.Assured ? "Assured" :'Not Assured'}</div>
      
    // </Stack>
    //       </Card.Text>
    //     </Card.Body>
    //   </Card>
         
    //   </Box>  
    //   </Box>  
    // </div>
    <div className='d-flex justify-content-center c'  >
         <Box sx={{ display : 'flex' }}>
     <AdminSideBar/>
     <Box component = 'main' sx={{flexGrow : 1,p:3}}>
        <DrawerHeader/>
    <div class="container py-4 my-4 mx-auto d-flex flex-column" style={{border:'2px solid black',boxShadow : '8px 8x 8px 8px'}}>
    <div class="header">
        {/* <div class="row r1">
            <div class="col-md-9 abc">
                <h1>{bike.vehicleName}</h1>
            </div>
            <div class="col-md-3 text-right pqr"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></div>
            <p class="text-right para">Based on 250 Review</p>
        </div> */}
    </div>
    {/* <div class="container-body mt-4">
        <div class="row r3">
            <div class="col-md-5 p-0 klo">
                <ul>
                    <li>Model : {bike.vehicleModel}</li>
                    <li>Brand : {bike.Brand}</li>
                    <li>Color : {bike.Color}</li>
                    <li>Fuel Used : {bike.Fuel}</li>
                    <li>Assured : {bike.Assured ? "Assured" : "Not Assured"}</li>
                    <li><h2>Price : Rs.{bike.Price}</h2></li>
                    <li>Express Delivery : 2-3 Days</li>
                    <li>COD Available (All Over India)</li>
                </ul>
            </div>
            <div class="col-md-7"> <img src={bike.Photo[0]} width="95%" height="95%"/> </div>
        </div>
    </div> */}
    <div class="footer d-flex flex-column mt-5">
    {/* <Grid container spacing={2} columns={16}>
  <Grid item xs={8}>
    <Item>xs=8</Item>
  </Grid>
  <Grid item xs={8}>
    <Item>xs=8</Item>
  </Grid>
</Grid> */}
    </div>
</div>
</Box>
</Box>
</div>

  )
}

export default SingleBikeView