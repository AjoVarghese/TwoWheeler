import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { createOrderAction } from "../../redux/Actions/USER_ACTIONS/createOrderAction";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button, Grid } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function SuccessPage() {
  const dispatch = useDispatch();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const userId = searchParams.get("userId").trim();

  const userName = searchParams.get("userName").trim();
  const bikeId = searchParams.get("bikeId").trim();
  const bikeName = searchParams.get("bikeName").trim();
  const bikeModel = searchParams.get("bikeModel");
  const image = searchParams.get("image").trim();
  const totalAmount = searchParams.get("totalAmount").trim();
  const totalHours = searchParams.get("totalHours").trim();
  const startDate = searchParams.get("startDate").trim();
  const endDate = searchParams.get("endDate").trim();
  const loc = searchParams.get("location").trim();
  const needHelmet = searchParams.get("needHelmet").trim();
  const paymentType = searchParams.get("paymentType").trim();
  const couponCode = searchParams.get("couponCode").trim();

  const bookingDetails = {
    userId,
    userName,
    bikeId,
    bikeName,
    bikeModel,
    image,
    totalAmount,
    bookedTimeSlots: {
      startDate,
      endDate,
    },
    totalHours,
    loc,
    needHelmet,
    paymentType,
    couponCode,
  };

  useEffect(() => {
    dispatch(createOrderAction(bookingDetails));
  }, []);

  return (
    <div>
      <Box sx={{ width: "100%" }} className="mt-5 container">
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid xs={7}>
            <Item>
              <figure className="figure">
                <img
                  src={require("../../../src/assets/Images/successs.jpg")}
                  className="figure-img img-fluid rounded shadow-3 mb-3"
                  alt="..."
                  style={{ width: "40rem" }}
                />
              </figure>
            </Item>
          </Grid>
          <Grid xs={4}>
            <Item>
              <Stack spacing={2} sx={{ width: "100%" }}>
                <figure className="figure">
                  <img
                    src={require("../../../src/assets/Images/check.png")}
                    className="figure-img img-fluid rounded shadow-3 mb-3"
                    alt="..."
                    style={{ width: "7rem" }}
                  />
                </figure>

                <h5>Booking Successfull</h5>
                <p>Go to my rides to view more details</p>

                <Button size="md" style={{ backgroundColor: "#fed250" }}>
                  <Link
                    to="/my-rents"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    My Rides
                  </Link>
                </Button>
              </Stack>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default SuccessPage;
