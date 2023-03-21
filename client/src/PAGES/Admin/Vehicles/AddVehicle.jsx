import { Box, styled } from '@mui/material';
import React from 'react'
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import AdminSideBar from '../../../COMPONENTS/NAVBAR/AdminSideBar';
import { MDBCard, MDBCardBody, MDBCol, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';

function AddVehicle() {
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));
  return (
    <div>
        <Box sx={{ display : 'flex' }}>
      <AdminSideBar/>
      <Box component = 'main' sx={{flexGrow : 1,p:3}}>
        <DrawerHeader/>
        
        <Card className='container col-md-6' style={{ boxShadow : "2px 2px 2px 1px"}}>
        
        <div className="card flex flex-column md:flex-row gap-3">
            {/* <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                </span> */}
                <h1 className='ms-4 mt-2'>Add Bike</h1>
                
                <MDBRow className='pt-2 ms-3 me-3 mb-4'>
        <MDBCol>
          <label htmlFor="">Bike Name</label>
          <MDBInput id='form3Example1'  />
        </MDBCol>
        <MDBCol>
        <label htmlFor="">Bike Model</label>
          <MDBInput id='form3Example2'  />
        </MDBCol>
      </MDBRow>

      <MDBRow className='pt-2 ms-3 me-3 mb-4'>
        <MDBCol>
        <label htmlFor="">Engine No</label>
          <MDBInput id='form3Example1'  />
        </MDBCol>
        <MDBCol>
        <label htmlFor="">Brand</label>
          <MDBInput id='form3Example2'  />
        </MDBCol>
      </MDBRow>

      <MDBRow className='pt-2 ms-3 me-3 mb-4'>
        <MDBCol>
        <label htmlFor="">Fuel Used</label>
          <MDBInput id='form3Example1'  />
        </MDBCol>
        <MDBCol>
        <label htmlFor="">Description</label>
          <MDBInput id='form3Example2'  />
        </MDBCol>
      </MDBRow>
      
      <MDBRow className='pt-2 ms-3 me-3 mb-4'>
        <MDBCol>
        <label htmlFor="">Color</label>
          <MDBInput id='form3Example1'  />
        </MDBCol>
        <MDBCol>
        <label htmlFor="">Price</label>
          <MDBInput id='form3Example2' />
        </MDBCol>
      </MDBRow>

      <MDBRow className='pt-2 ms-3 me-3 mb-4'>
        <MDBCol>
        <label htmlFor="">Image1</label>
          <MDBInput id='form3Example1' type='file' />
        </MDBCol>
        <MDBCol>
        <label htmlFor="">Image2</label>
          <MDBInput id='form3Example2'  type='file' />
        </MDBCol>
      </MDBRow>

      <MDBRow className='pt-2 ms-3 me-3 mb-4'>
        <MDBCol>
        <label htmlFor="">Image3</label>
          <MDBInput id='form3Example1' type='file' />
        </MDBCol>
        <MDBCol>
        <label htmlFor="">Image4</label>
          <MDBInput id='form3Example2'  type='file' />
        </MDBCol>
      </MDBRow>

      <Button className='mb-4 container col-md-4 sm-3' style ={{backgroundColor : '#fed250'}}>ADD</Button>
            </div>
            {/* </div> */}
</Card>
      </Box>
      </Box>
    </div>
  )
}

export default AddVehicle