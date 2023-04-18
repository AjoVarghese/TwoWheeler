import { Box, Button, Grid } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import BasicModal from '../BasicModal/BasicModal'
import { cancelRideAction } from '../../redux/Actions/USER_ACTIONS/getRentedRides'

function CancelRide({bikeId,bookingId,startTime,endTime,userId,price,open,onClose}) {
    const dispatch = useDispatch()

    const handleCancel = (bikeId,bookingId) => {
       dispatch(cancelRideAction(bikeId,bookingId,startTime,endTime,userId,price))
       onClose()
    }


  return (
    <div>
         <BasicModal
    open={open}
    onClose={onClose}
    title = "Are u sure?"
    content={
             <Box>
              <p>This will cancel your ride?</p>
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
                handleCancel(bikeId,bookingId)
              }}
              >
               Cancel Ride
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

export default CancelRide