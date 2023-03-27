import { Box, styled, TextField } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import AdminSideBar from '../../../COMPONENTS/NAVBAR/AdminSideBar';
import { Figure } from 'react-bootstrap';

function EditBike() {
    const location = useLocation()
    console.log("Vlue",location.state.data.vehicleName);

    const dispatch = useDispatch()

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
        <h1>Edit Details</h1>
        <div style={{border : '0.2px solid black',boxShadow :'1px 1px 2px 2px grey',borderRadius:'5px'}}>
        <Form className='container mt-4 mb-5'>
      <Row className="mb-3 ">
        <Form.Group as={Col} controlId="formGridEmail">
         {/* <label htmlFor="">Vecle Name</label> */}
          <TextField
            margin="normal"
            fullWidth
            name = 'vehicleName'
            id="vehicleName"
            value={location.state.data.vehicleName}
             label="Vehicle Name"
            autoFocus
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <TextField
            margin="normal"
            fullWidth
            autoFocus
            name = 'vehicleModel'
            id="vehicleModel"
            value={location.state.data.vehicleModel}
            label="Vehicle Model"
            default={location.state.data._id}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3 ">
        <Form.Group as={Col} controlId="formGridEmail">
        

          <TextField
            margin="normal"
            fullWidth
            name = 'engineNo'
            id="engineNo"
            value={location.state.data.EngineNo}
            autoFocus
            label="Engine No"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">

          <TextField
            margin="normal"
            fullWidth
            name = 'brand'
            id="brand"
            value={location.state.data.Brand}
            autoFocus
            label="Brand"
          />
        </Form.Group>
      </Row>

      <Row className="mb-3 ">
        <Form.Group as={Col} controlId="formGridEmail">
       
          <TextField
            margin="normal"
            fullWidth
            name = 'color'
            id="color"
            value={location.state.data.Color}
            autoFocus
            label="Color"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
        
          <TextField
            margin="normal"
            fullWidth
            name = 'fuel'
            id="fuel"
            value={location.state.data.Fuel}
            autoFocus
            label="Fuel Used"
          />
        </Form.Group>
      </Row>

      <Row className="mb-3 ">
        <Form.Group as={Col} controlId="formGridEmail">
        
          <TextField
            margin="normal"
            fullWidth
            name = 'price'
            id="price"
            value={location.state.data.Price}
            autoFocus
            label="Price/hr"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
        
          <TextField
            margin="normal"
            fullWidth
            name = 'desc'
            id="desc"
            value={location.state.data.Description}
            autoFocus
            label="Description"
          />
        </Form.Group>
      </Row>

      <Row className="mb-3 ">
        <Form.Group as={Col} controlId="formGridEmail">
        <Figure>
      <Figure.Image
        width={171}
        height={180}
        alt="171x180"
        src={location.state.data.Photo[0]}
      />
     
    </Figure>
          <TextField
            margin="normal"
            type='file'
            fullWidth
            name = 'image1'
            id="image1"
            autoFocus
            label='Image1'
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
        <Figure>
      <Figure.Image
        width={171}
        height={180}
        alt="171x180"
        src={location.state.data.Photo[1]}
      />
     
    </Figure>
          <TextField
            margin="normal"
            type='file'
            fullWidth
            name = 'image2'
            id="image2"
            autoFocus
            label='Image2'
            
          />
        </Form.Group>
      </Row>

      <Row className="mb-3 ">
        <Form.Group as={Col} controlId="formGridEmail">
        <Figure>
      <Figure.Image
        width={171}
        height={180}
        alt="171x180"
        src={location.state.data.Photo[2]}
      />
     
    </Figure>
        <TextField
            margin="normal"
            type='file'
            fullWidth
            name = 'image3'
            id="image3"
            autoFocus
            label='Image3'
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
        <Figure>
      <Figure.Image
        width={171}
        height={180}
        alt="171x180"
        src={location.state.data.Photo[3]}
      />
     
    </Figure>
        <TextField
            margin="normal"
            type='file'
            fullWidth
            name = 'image4'
            id="image4"
            autoFocus
            label='Image4'
          />
        </Form.Group>
      </Row>

      {/* <Form.Group as={Col} controlId="formGridEmail">
          
          <TextField
            margin="normal"
            fullWidth
            name = 'color'
            id="color"
            autoFocus
            label="Color"
          />
        </Form.Group> */}

        {/* <Form.Group as={Col} controlId="formGridEmail">
         
          <TextField
            margin="normal"
            fullWidth
            name = 'vehicleName'
            id="vehicleName"
            autoFocus
            label="Vehicle Name"
          />
        </Form.Group> */}

      {/* <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />
      </Form.Group> */}

      {/* <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control />
        </Form.Group>
      </Row> */}

      {/* <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}

      <Button variant="primary" type="submit" style={{width : "100%"}}>
        Save Changes
      </Button>
    </Form>
    </div>
      </Box> 
      </Box> 
    </div>
  )
}

export default EditBike