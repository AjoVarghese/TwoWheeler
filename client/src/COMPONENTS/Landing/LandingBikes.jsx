import React from "react";
import {
  MDBCard,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

export default function LandingBikes({ bikes }) {

  const navigate = useNavigate();
  return (
    <>
      <div class="row d-flex justify-content-center">
        {bikes
          ? bikes.map((bike) => {
              return (
                <MDBCard
                  className="col-md-3 mx-3"
                  onClick={(e) =>
                    navigate("/bike-detailed-view", {
                      state: { bikes, bikeId: bike._id },
                    })
                  }
                >
                  <figure className="figure">
                    <img
                      src={bike.Photo[0]}
                      className="figure-img img-fluid rounded shadow-3 mb-3 w-100 h-80"
                      alt="..."
                    />
                    <MDBCardTitle class="row d-flex justify-content-center">
                     Rs. {bike.Price}/hr
                    </MDBCardTitle>
                  </figure>
                </MDBCard>
              );
            })
          : ""}
      </div>
    </>
  );
}
