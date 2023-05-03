import React from "react";
import BasicModal from "../BasicModal/BasicModal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import { addLocation } from "../../redux/Actions/ADMIN_ACTIONS/locationActions";

const schema = yup.object().shape({
  location: yup
    .string("location should be a string")
    .required("Location is required"),
});

function AddLocationModal({ open, onClose }) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitHandler = (data) => {
    let location = data.location;

    dispatch(addLocation(location));
    onClose();
  };
  return (
    <div>
      <BasicModal
        open={open}
        onClose={onClose}
        title="Add Coupon"
        content={
          <Box component="form" onSubmit={handleSubmit(submitHandler)}>
            <TextField
              id="outlined-basic"
              label="Location"
              variant="outlined"
              name="location"
              error={!!errors.location}
              helperText={errors.location ? errors.location.message : ""}
              {...register("location")}
              style={{ width: "100%" }}
            />

            <Box sx={{ flexGrow: 1 }} className="mt-3">
              <Grid container spacing={2} columns={16}>
                <Grid item xs={8}>
                  <Button variant="contained" color="error" onClick={onClose}>
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={8}>
                  <Button variant="contained" color="info" type="submit">
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        }
      ></BasicModal>
    </div>
  );
}

export default AddLocationModal;
