import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import BasicModal from "../BasicModal/BasicModal";
import { cancelRideAction } from "../../redux/Actions/USER_ACTIONS/getRentedRides";
import { cancelRideApi } from "../../api/User/ApiCalls";

function CancelRide({
  bikeId,
  bookingId,
  startTime,
  endTime,
  userId,
  price,
  open,
  onClose,
}) {
  const dispatch = useDispatch();

  const handleCancel = (bikeId, bookingId) => {
    cancelRideApi(bikeId, bookingId, startTime, endTime, userId, price).then((data) => {
      dispatch(cancelRideAction(data.data))
      onClose()
    })
  };

  return (
    <div>
      <BasicModal
        open={open}
        onClose={onClose}
        title="Are u sure?"
        content={
          <Box>
            <p>This will cancel your ride?</p>
            <Grid container spacing={2} columns={16}>
              <Grid item xs={8}>
                <Button variant="contained" color="primary" onClick={onClose}>
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={8}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={(e) => {
                    handleCancel(bikeId, bookingId);
                  }}
                >
                  Cancel Ride
                </Button>
              </Grid>
            </Grid>
          </Box>
        }
      ></BasicModal>
    </div>
  );
}

export default CancelRide;
