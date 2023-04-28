import React from "react";
import { useForm } from "react-hook-form";
import "semantic-ui-css/semantic.min.css";
import { Button } from "semantic-ui-react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { userLoginAction } from "../../../redux/Actions/USER_ACTIONS/LoginAction";
import { keyframes } from "@emotion/react";
import { Alert, Box, TextField, Typography } from "@mui/material";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const schema = yup.object().shape({
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
});
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLoginData = useSelector((state) => state.userLoginReducer);

  const { userLoginDetails, userLoginError, loading } = userLoginData;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitHandler = async (data) => {
    try {
      dispatch(userLoginAction(data.mobile, data.password));
    } catch (error) {}
  };

  const slideInFromRight = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

  return (
    <div className="login">
      <MDBContainer className="p-3 my-5 mt-5">
        <MDBRow>
          <MDBCol col="10" md="6" className="mt-5">
            <img
              src={require("../../../assets/Images/userLogin.png")}
              class="img-fluid"
            />
          </MDBCol>

          <MDBCol col="4" md="6" className="mt-5">
            <Typography component="h1" variant="h5">
              Sign In To Your Account!!
            </Typography>

            {userLoginError ? (
              <Alert
                sx={{
                  position: "fixed",
                  top: 0,
                  right: "20px",
                  width: "35%",
                  margin: "20px 0",
                  animation: `${slideInFromRight} 0.3s forwards ease-in`,
                }}
                severity="error"
              >
                {userLoginError} — check it out!
              </Alert>
            ) : (
              ""
            )}

            {loading ? <p>{userLoginError}</p> : ""}

            <Box
              component="form"
              onSubmit={handleSubmit(submitHandler)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                type="number"
                fullWidth
                name="mobile"
                id="mobile"
                autoFocus
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ backgroundColor: "#F7CA18" }}
              >
                Sign In
              </Button>
            </Box>

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">OR</p>
            </div>
            <Box sx={{ width: "100%" }}>
              <Stack spacing={2}>
                <Item>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    <Link
                      to="/signup"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {" "}
                      Sign Up
                    </Link>
                  </Button>
                </Item>
                <Item>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    <Link
                      to="/otp-login"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {" "}
                      Login with OTP
                    </Link>
                  </Button>
                </Item>
              </Stack>
            </Box>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Login;
