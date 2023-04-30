import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCol,
  MDBIcon,
  MDBRow,
} from "mdb-react-ui-kit";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

function AllAcceptedBIkes({ acceptedBikes, selectedLoc }) {
  const navigate = useNavigate();

  console.log("selectedloc", selectedLoc);

  console.log("accep", acceptedBikes);

  const bikes = useSelector((state) => state.bikesReducer);
  const { loading, bikesData } = bikes;

  return (
    <div className="d-flex justify-content-center col-md-12">
      {bikesData?.data.length === 0 ? (
        <h6>No Data Available</h6>
      ) : (
        <MDBRow className="col-lg-12 ">
          {loading ? (
            <Loading />
          ) : acceptedBikes?.data ? (
            acceptedBikes?.data.map((x, i) => {
              return (
                <>
                  <MDBCol className="col-md-4 mt-3 ">
                    <MDBCard className="text-black">
                      <MDBIcon
                        fab
                        icon="apple"
                        size="md"
                        className="px-3 pt-3 pb-2"
                      />
                      <MDBCardImage
                        className="d-flex justify-content-center"
                        src={x.Photo[0]}
                        style={{ width: "17.2rem", height: "10rem" }}
                        position="top"
                        alt="Apple Computer"
                        onClick={(e) =>
                          navigate("/bike-detailed-view", {
                            state: { bikesData, bikeId: x._id },
                          })
                        }
                      />
                      <MDBCardBody style={{ backgroundColor: "#DCDCDC" }}>
                        <div className="text-center">
                          <MDBCardTitle>{x.vehicleName}</MDBCardTitle>
                          <p className="text-muted mb-4">{x.Description}</p>
                        </div>
                        <div>
                          <div className="d-flex justify-content-between">
                            <span>Model</span>
                            <span>{x.vehicleModel}</span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span>Brand</span>
                            <span>{x.Brand}</span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span>Location</span>
                            <span>{x.Location}</span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span>Color</span>
                            <span>{x.Color}</span>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between total font-weight-bold mt-4">
                          <span>Rent Amount(per hr)</span>
                          <span>Rs.{x.Price}</span>
                        </div>
                        <div className="mt-3">
                          <button
                            type="button"
                            style={{
                              width: "100%",
                              backgroundColor: "#fed250",
                              borderRadius: "6px",
                              height: "3rem",
                              border: "none",
                            }}
                            onClick={(e) =>
                              navigate("/booking-summary", {
                                state: { bikesData, bikeId: x._id },
                              })
                            }
                          >
                            Book Now
                          </button>
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                  {/* ) : 
                } */}
                </>
              );
            })
          ) : (
            ""
          )}
        </MDBRow>
      )}
    </div>
  );
}

export default AllAcceptedBIkes;
