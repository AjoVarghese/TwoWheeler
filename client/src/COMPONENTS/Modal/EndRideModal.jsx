import { Box, Button, Grid } from '@mui/material'
import React from 'react'
import BasicModal from '../BasicModal/BasicModal'
import { endRideApi } from '../../api/User/ApiCalls'
import { useDispatch } from 'react-redux'
import { endRideAction } from '../../redux/Actions/USER_ACTIONS/getRentedRides'


function EndRideModal({bikeId,bookingId,startTime,endTime,userId,open,onClose}) {

    const dispatch = useDispatch()

    const handleEndRide = () => {
      endRideApi(bikeId,bookingId,startTime,endTime,userId).then((data) => {
        onClose()
        dispatch(endRideAction(data.data))
        
      })
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
                handleEndRide(bikeId,bookingId)
              }}
              >
               End Ride
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

export default EndRideModal