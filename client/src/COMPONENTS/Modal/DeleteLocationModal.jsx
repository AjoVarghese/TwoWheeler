import React from 'react'
import BasicModal from '../BasicModal/BasicModal'
import { Box, Button, Grid } from '@mui/material'
import { useDispatch } from 'react-redux'
import { deleteLocation } from '../../redux/Actions/ADMIN_ACTIONS/locationActions'

function DeleteLocationModal({open,onClose,locationId,message}) {

    const dispatch = useDispatch()

    const handleDelete = (id) => {
        dispatch(deleteLocation(id))
        onClose()
    }
  return (
    <div>
        <BasicModal
    open={open}
    onClose={onClose}
    title = {message}
    content={
             <Box>
              {/* <p>Delete location</p> */}
              <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
            <Button
              variant="contained"
              color="primary"
              onClick={onClose}
            >
              Cancel
            </Button>
        </Grid>
        <Grid item xs={8}>
          <Button
              variant="contained"
              color="error"
              onClick={(e) => {
                handleDelete(locationId)
              }}
              >
               Delete
          </Button>
        </Grid>
      </Grid>
             </Box>
         }
    >
    </BasicModal>
    </div>
  )
}

export default DeleteLocationModal