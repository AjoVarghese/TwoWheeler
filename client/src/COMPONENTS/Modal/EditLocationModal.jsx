import React from "react";
import BasicModal from "../BasicModal/BasicModal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, TextField, styled } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editLocation } from "../../redux/Actions/ADMIN_ACTIONS/locationActions";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const schema = yup.object().shape({
  location: yup
    .string("Location should be a string")
    .min(3, "location should hae min length of 3")
    .max(20, "location should have max length of 20")
    .required("location is required"),
});

function EditLocationModal({ open, onClose, locationId, loc }) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitHandler = (data) => {
    console.log("edit data", data);
    const location = data.location;
    dispatch(editLocation(locationId, location));
    onClose();
  };
  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title="Edit Location"
      content={
        <Box component="form" onSubmit={handleSubmit(submitHandler)}>
          <TextField
            id="outlined-basic"
            label="location"
            variant="outlined"
            name="location"
            defaultValue={loc}
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
                  Edit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      }
    ></BasicModal>
  );
}

export default EditLocationModal;
