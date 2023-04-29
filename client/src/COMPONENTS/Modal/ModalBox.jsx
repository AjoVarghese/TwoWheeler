import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { Box, Button } from "@mantine/core";
import { CircularProgress, TextField, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { editProfileApi } from "../../api/User/ApiCalls";

import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/Actions/USER_ACTIONS/userProfileAction";

const schema = yup.object().shape({
  mobile: yup
    .string("Mobile should be a number")
    .min(10, "Mobile No should have a minimum length of 10")
    .max(10, "Mobile No  should have a maximum length of 10")
    .required("Mobile No  is required"),
  email: yup
    .string("email should be a string")
    .test(
      "no spaces",
      "Email cannot be empty or contain only spaces",
      (value) => {
        return value && value.trim().length > 0;
      }
    )
    .email("please provide a valid email")
    .required("email address is required"),
  name: yup
    .string("password should be a string")
    .test(
      "no spaces",
      "name cannot be empty or contain only spaces",
      (value) => {
        return value && value.trim().length > 0;
      }
    )
    .required("password is required"),
});

export default function ModalBox({ closeModal, details }) {
  console.log("DETILAS", details);
  const [basicModal, setBasicModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const toggleShow = () => setBasicModal(!basicModal);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitHandler = (data) => {
    setLoading(true);
    console.log("MODAL DATA", data);
    let name = data.name;
    let email = data.email;
    let mobile = data.mobile;

    editProfileApi(name, email, mobile, details.id).then((data) => {
      localStorage.setItem("userInfo", JSON.stringify(data.data));
      dispatch(updateProfile(data.data));
      setLoading(false);
      closeModal(false);
    });
  };

  return (
    <>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <Typography component="h1" variant="h5">
                Edit Details
              </Typography>

              <MDBBtn
                className="btn-close"
                color="none"
                onClick={(e) => closeModal(false)}
              ></MDBBtn>
            </MDBModalHeader>

            <Box
              component="form"
              onSubmit={handleSubmit(submitHandler)}
              sx={{ mt: 1 }}
            >
              <MDBModalBody>
                <TextField
                  margin="normal"
                  fullWidth
                  name="name"
                  id="name"
                  label="Username"
                  defaultValue={details.Name}
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ""}
                  {...register("name")}
                />

                <TextField
                  margin="normal"
                  fullWidth
                  name="email"
                  id="email"
                  label="Email"
                  defaultValue={details.Email}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                  {...register("email")}
                />

                <TextField
                  margin="normal"
                  fullWidth
                  name="mobile"
                  id="mobile"
                  label="Mobile"
                  defaultValue={details.Mobile}
                  error={!!errors.mobile}
                  helperText={errors.mobile ? errors.mobile.message : ""}
                  {...register("mobile")}
                />
              </MDBModalBody>

              <MDBModalFooter>
                <Button variant="soft" onClick={(e) => closeModal(false)}>
                  Close
                </Button>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  {loading ? (
                    <Button
                      className="mb-4 container col-md-4 sm-3"
                      style={{ backgroundColor: "black" }}
                      disabled
                    >
                      <CircularProgress />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      style={{ backgroundColor: "#ffc720", color: "black" }}
                    >
                      Save Changes
                    </Button>
                  )}
                </Box>
              </MDBModalFooter>
            </Box>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
