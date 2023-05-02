import React, { useEffect, useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button } from "semantic-ui-react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { keyframes } from "@emotion/react";

import { userRegister } from "../../../redux/Actions/USER_ACTIONS/RegisterAction";
import { userSignupApi } from "../../../api/User/ApiCalls";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { Alert, Box, CircularProgress, TextField, Typography } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../firebase/firebase.config";
import { googleSignupAction } from "../../../redux/Actions/USER_ACTIONS/googleSignupAction";

const schema = yup.object().shape({
  name: yup
    .string("name should be a string")
    .min(3, "name should have a min length of 3 letters")
    .required("name is required"),
  email: yup
    .string("email should be a string")
    .email("please provide a valid email")
    .required("email address is required"),
  mobile: yup
    .string("email should be a string")
    .min(10, "Mobile No should have a minimum length of 10")
    .max(10, "Mobile No  should have a maximum length of 10")
    .required("Mobile No  is required"),
  password: yup
    .string("password should be a string")
    .min(5, "password should have a minimum length of 5")
    .max(12, "password should have a maximum length of 12")
    .required("password is required"),
  referalCode: yup.string().optional(),
});

// const slideInFromRight = keyframes`
//   0% {
//     transform: translateX(100%);
//   }
//   100% {
//     transform: translateX(0);
//   }
// `;


function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading,setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitHandler = async (data) => {
    setLoading(true)
    const Name = data.name;
    const Email = data.email;
    const Password = data.password;
    const Mobile = data.mobile;
    const Referral = data.referalCode;
    try {
      userSignupApi(Name, Email, Mobile, Password, Referral)
        .then((data) => {
          dispatch(userRegister(data.data));
          setLoading(false)
          navigate("/login");
        })
        .catch((err) => {
          setErrorMsg(err.response.data);
          setError(true);
        });
    } catch (error) {}
  };


  useEffect(() => {
    let userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      navigate("/");
    } else {
      navigate("/signup");
    }
  }, []);

  const googleSignup = () => {
    signInWithPopup(auth, provider).then((data) => {
      dispatch(
        googleSignupAction(
          data.user.displayName,
          data.user.email,
          data.user.phoneNumber,
          data.user.photoURL
        )
      );
    });
  };

  return (
    <div className="login" style={{ border: "1rem solid;" }}>
      <MDBContainer className="p-3 my-5 mt-5">
        {error === true ? (
          <Alert
            sx={{
              position: "fixed",
              top: 0,
              right: "20px",
              width: "35%",
              margin: "20px 0",
              // animation: `${slideInFromRight} 0.3s forwards ease-in`,
            }}
            severity="error"
          >
            {errorMsg} — check it out!
          </Alert>
        ) : (
          ""
        )}
        <MDBRow>
          <MDBCol col="10" md="6" className="mt-5">
            <img
              src={require("../../../assets/Images/userSignup.png")}
              class="img-fluid"
              alt="signup"
            />
          </MDBCol>

          <MDBCol col="4" md="6" className="mt-5">
            <Typography component="h1" variant="h5">
              Sign In To Your Account!!
            </Typography>


            <Box
              component="form"
              onSubmit={handleSubmit(submitHandler)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                autoFocus
                fullWidth
                name="name"
                id="name"
                label="Name"
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
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
                {...register("email")}
              />

              <TextField
                margin="normal"
                type="number"
                fullWidth
                name="mobile"
                id="mobile"
                label="Mobile"
                error={!!errors.mobile}
                helperText={errors.mobile ? errors.mobile.message : ""}
                {...register("mobile")}
              />

              <TextField
                margin="normal"
                fullWidth
                name="password"
                id="password"
                label="Password"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
                {...register("password")}
              />

              <TextField
                margin="normal"
                fullWidth
                name="referalCode"
                id="referalCode"
                label="Referal Code(optional)"
                {...register("referalCode")}
              />
              
              {
                loading ? 
                <Button
                className="mb-4 container col-md-4 sm-3 mt-4"
                style={{ backgroundColor: "#fed250" }}
                disabled
              >
                <CircularProgress />
              </Button>
                  : <Button
                  type="submit"
                  className="mt-3"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{ backgroundColor: "#F7CA18" ,width : '100%'}}
                >
                  Sign Up
                </Button>
              }
             
            </Box>

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">OR</p>
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              <Link to="/login"> Sign In</Link>
            </Button>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={googleSignup}
            >
              Sign Up with Google
            </Button>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Signup;
