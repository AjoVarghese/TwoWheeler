import React, { useEffect } from 'react'
import { Box, styled } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import AdminSideBar from '../../../COMPONENTS/NAVBAR/AdminSideBar';
import { Card} from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { bikeSingleViewAction } from '../../../REDUX/Actions/ADMIN_ACTIONS/bikeSingleViewAction';



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


    const bike = useSelector((state) => state.singleBikeReducer.singleBikeData)
    console.log("BIKE",bike);

    // useEffect(() => {
    //   dispatch(bikeSingleViewAction())
    // },[])
  return (
    <div className='d-flex justify-content-center c' >
         <Box sx={{ display : 'flex' }}>
      <AdminSideBar/>
      <Box component = 'main' sx={{flexGrow : 1,p:3}}>
        <DrawerHeader/>
        
        <Card className='col-md-12' style={{width :'40rem'}}>
        <Card.Text>
           <div className='me-4 mt-3' style={{float : 'right'}}>
             More
           </div>
          </Card.Text>
        <Card.Img variant="top" src={bike.Photo[0]} />
        <Card.Body>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
            <Container fluid>
      <Row className='mt-3'>
        <Col><h3>Vehicle :{bike.vehicleName}</h3> </Col>
      </Row>
    </Container>
            <Stack direction="horizontal" gap={3} className = 'mt-3'>
      <div className="bg-light border ms-auto">{bike.Brand}</div>
      <div className="bg-light border ms-auto">Model :{bike.vehicleModel}</div>
      <div className="vr" />
      <div className="bg-light border">EngineNo : {bike.EngineNo}</div>
    </Stack>
    <Stack direction="horizontal" gap={3} className = 'mt-3'>
      <div className="bg-light border ms-auto">Price : {bike.Price}/hr</div>
      <div className="bg-light border ms-auto">Fuel Used :{bike.Fuel}</div>
      <div className="vr" />
      <div className="bg-light border">Color : {bike.Color}</div>
    </Stack>
    <Stack direction="horizontal" gap={3} className = 'mt-3'>
      <div className="bg-light border ms-auto">Assured : {bike.Assured ? "Assured" :'Not Assured'}</div>
      {/* <div className="bg-light border ms-auto">Fuel Used :{bike.Fuel}</div>
      <div className="vr" />
      <div className="bg-light border">Color : {bike.Color}</div> */}
    </Stack>
          </Card.Text>
        </Card.Body>
      </Card>
         {/* <h1>{bike.vehicleName}</h1>
         <img src={bike.Photo[0]} alt="" /> */}
      </Box>  
      </Box>  
    </div>
  )
}

export default SingleBikeView