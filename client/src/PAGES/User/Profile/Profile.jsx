import React, { useEffect, useState,  } from "react";
import Navbar from "../../../components/NAVBAR/Navbar";
import "./Profile.css";
import Button from "react-bootstrap/Button";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBInput,
} from "mdb-react-ui-kit";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { imageUploadAction } from "../../../redux/Actions/USER_ACTIONS/userProfileAction";
import ModalBox from "../../../components/Modal/ModalBox";
import { getWalletAction } from "../../../redux/Actions/USER_ACTIONS/getWalletAction";
import { imageUploadApi } from "../../../api/User/ApiCalls";
import { Toaster, toast } from "react-hot-toast";
import { CircularProgress } from "@mui/material";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getWalletAction());
  }, []);

  const wallet = useSelector((state) => state.getWalletReducer.walletData);

  const profileData = useSelector(
    (state) => state.userLoginReducer.userLoginDetails
  );

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null)
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
    formData.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
      {
        method: "post",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (
          data.format !== "jpg" &&
          data.format !== "jpeg" &&
          data.format !== "png"
        ) {
          setError("Please upload a JPEG or PNG file");
          setLoading(false)
          return;
        }
        imageUploadApi(profileData.id, data.url).then((data) => {
          dispatch(imageUploadAction(data.data));
          setLoading(false);
          toast.success("Profile Image Uploaded successfully!");
          setTimeout(() => {}, 2500);
        });
      });
  };

  return (
    <>
      <Navbar />

      <section>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{ duration: 4000 }}
        />
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol></MDBCol>
          </MDBRow>
          {modal ? (
            <ModalBox closeModal={setModal} details={profileData} />
          ) : (
            ""
          )}
          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    type="file"
                    src={
                      profileData
                        ? profileData.ProfileImage
                        : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    }
                    alt="avatar"
                    className="circle"
                    style={{
                      width: "200px",
                      height: "200x",
                      borderRadius: "50%",
                    }}
                    fluid
                  />
                  <p className="text-muted mb-1">{profileData.Name}</p>
                  <p className="text-muted mb-4">{profileData.Email}</p>
                  <div className="d-flex justify-content-center mb-2">
                    <div className="d-flex flex-column align-items-center mb-2">
                      <Button variant="secondary">
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.webp"
                          onChange={(e) => setImage(e.target.files[0])}
                          style={{ width: "15rem" }}
                          className="ms-3"
                        />
                      </Button>{" "}
                      {loading ? (
                        <Button
                          className="mb-4 container col-md-4 sm-3 mt-4"
                          style={{ backgroundColor: "#fed250" }}
                          disabled
                        >
                          <CircularProgress />
                        </Button>
                      ) : (
                        <Button
                          variant="warning ms-3 mt-3"
                          onClick={handleClick}
                          style={{ backgroundColor: "#fed250" }}
                          className="me-3"
                        >
                          Upload
                        </Button>
                      )}
                    </div>
                  </div>

                  {error && <p style={{ color: "red" }}>{error}</p>}
                </MDBCardBody>
              </MDBCard>

              <MDBCard className="mb-4 mb-lg-0">
                <MDBCardBody className="p-0">
                  <MDBListGroup flush className="rounded-3">
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon
                        fab
                        icon="facebook fa-lg"
                        style={{ color: "#3b5998" }}
                      />
                      <p>
                        Wallet Amount:{" "}
                        <span>
                          {wallet?.walletAmount ? (
                            <h4>Rs.{wallet?.walletAmount}.00</h4>
                          ) : (
                            <h4>Rs.0.00</h4>
                          )}
                        </span>
                      </p>
                      <div className="d-flex flex-wrap justify-content-center">
                        <Button
                          variant="warning ms-4"
                          style={{ backgroundColor: "#fed250" }}
                          onClick={(e) => {
                            navigate("/my-wallet", { state: { wallet } });
                          }}
                        >
                          My Wallet
                        </Button>{" "}
                      </div>
                    </MDBListGroupItem>
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <h1 className="mt-3 ms-4" style={{ fontSize: "25px" }}>
                  User Details
                </h1>
                <MDBCardBody>
                  <label htmlFor="">Username</label>
                  <MDBRow>
                    <MDBInput
                      placeholder={profileData.Name}
                      id="formControlReadOnly"
                      type="text"
                      readonly
                    />
                  </MDBRow>
                  <label htmlFor="">Email</label>
                  <MDBRow>
                    <MDBInput
                      placeholder={profileData.Email}
                      id="formControlReadOnly"
                      type="text"
                      readonly
                    />
                  </MDBRow>
                  <label htmlFor="">Mobile No</label>
                  <MDBRow>
                    <MDBInput
                      placeholder={profileData.Mobile}
                      id="formControlReadOnly"
                      type="number"
                      readonly
                    />
                  </MDBRow>
                  <MDBRow>
                    <Button
                      variant="warning ms-4 me-4 mt-3"
                      style={{ backgroundColor: "#fed250", width: "50rem" }}
                      onClick={(e) => {
                        setModal(true);
                      }}
                    >
                      Edit Details
                    </Button>{" "}
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>

              <MDBRow>
                <MDBCol md="12"></MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}

export default Profile;
