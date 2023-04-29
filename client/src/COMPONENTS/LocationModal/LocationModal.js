import React, { useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import { Box} from '@mantine/core';
import { TextField,Button } from '@mui/material';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addLocation, editLocation } from '../../redux/Actions/ADMIN_ACTIONS/locationActions';


const schema = yup.object().shape({    
    location : yup
            .string("location should be a string")
            .required("Location is required"),         
  })

const LocationModal = ({closeModal,message,action,locationId}) => {
 ;
  console.log("LOCATION",locationId);
  console.log("action",action);
  
    const [basicModal, setBasicModal] = useState(true);

    const dispatch = useDispatch()

    const toggleShow = () => setBasicModal(!basicModal);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });

      const submitHandler = (data) => {
        let location = data.location
          if(action === 'add'){
            console.log("add location");
            console.log(data);
           
            dispatch(addLocation(location))
            closeModal(false)
          } else {
            console.log("editing");
            dispatch(editLocation(locationId,location))
            closeModal(false)
          }
      }
  return (
    <div>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Modal title</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={(e) => closeModal(false)}></MDBBtn>
            </MDBModalHeader>
            <Box
          component="form"
          onSubmit={handleSubmit(submitHandler)}
          sx={{ mt: 1 }}
        >
         
            <>
            <h5 className='ms-4 mt-3'>{message}</h5>
            <MDBModalBody>
            <TextField
            margin="normal"
            fullWidth
            name = 'location'
            id="location"
            label="Location"
            
            error={!!errors.location}
            helperText={errors.location ? errors.location.message : ""}
            {...register("location")}
          />
            </MDBModalBody>

            <MDBModalFooter>
              <Button variant="contained" color="error"
              onClick={(e) => closeModal(false)}>
             Close
              </Button>

              <Button type='submit' variant="contained" color="info" className='ms-3'>
            {action?.add ? "ADD" : "Edit"}
              </Button>
            </MDBModalFooter> 
            </>
            </Box>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  )
}

export default LocationModal