import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

function ErrorPage() {
  return (
    <div>
      <MDBContainer fluid className="p-4">
        <MDBRow className="container">
          <MDBCol
            md="6"
            className="text-center text-md-start d-flex flex-column justify-content-center"
          >
            <h1 className="my-5 display-3 fw-bold ls-tight px-3">
              404 Error <br />
              <span className="text-warning">Page not found</span>
            </h1>
          </MDBCol>

          <MDBCol md="6">
            <figure className="figure">
              <img
                src={require("../../../src/assets/Images/404-erro.png")}
                className="figure-img img-fluid rounded shadow-3 mb-3"
                alt="..."
              />
            </figure>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default ErrorPage;
