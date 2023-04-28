import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "semantic-ui-css/semantic.min.css";
import { Button, Form } from "semantic-ui-react";
import "./Otplogin.css";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../firebase/firebase.config";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { otpLoginAction } from "../../../redux/Actions/USER_ACTIONS/LoginAction";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";

function Otplogin() {
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  // const [loading,setLoading] = useState(false)
  const [showOTP, setShowOTP] = useState(false);
  // const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  console.log(phone);

  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("RESPONSE", response);
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    onCaptchaVerify();

    const appVerifier = window.recaptchaVerifier;
    const phoneNumber = "+" + phone;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setShowOTP(true);
        toast.success("OTP successfully send!");
        window.confirmationResult = confirmationResult;
        // ...
      })
      .catch((error) => {
        console.log("OTP ERROR", error);
      });
  }

  function onOTPVerify() {
    window.confirmationResult
      .confirm(otp)
      .then(async (result) => {
        console.log("REsult", result);
        console.log("mobile", result.user.phoneNumber);
        let mobile = result.user.phoneNumber.substring(3);
        console.log("MOBILE", mobile);
        dispatch(otpLoginAction(mobile));
        toast.success("Logged in successfully!");
      })
      .catch((err) => {
        console.log("some error", err);
       
      });
  }
  return (
     
    <div className='login'>
      <MDBContainer className="p-3 my-5 mt-5">
        <MDBRow>
          <MDBCol col='10' md='4' className='mt-5'>
          <img src={require('../../../assets/Images/otpLogin.jpg')} class="img-fluid" alt="Phone image" />
          </MDBCol>
          <MDBCol  col='8' md='6'  className='mt-5 ms-0 me-0'>
          <div className="otp-login">
      <div id="recaptcha-container"></div>
      <Toaster toastOptions={{ duration: 4000 }}></Toaster>

      <div className="login-box">
        {showOTP ? (
          <div className="login-body">
            <h2 className="login-header">Verify OTP</h2>
            <div className="form-div">
              <label htmlFor="">Enter the OTP*</label>

              <input
                type="text"
                placeholder="OTP"
                {...register("OTP", {
                  required: true,
                  maxLength: 6,
                  minLength: 6,
                })}
                onChange={(e) => setOtp(e.target.value)}
              />
              

              {errors.OTP && (
                <p style={{ color: "red" }}>Please check the OTP</p>
              )}
              <Button
                type="submit"
                className="otp-button"
                style={{ backgroundColor: "#0e7be8", color: "white" }}
                onClick={onOTPVerify}
              >
                LOGIN
              </Button>
             
              <div id="recaptcha-container"></div>
            </div>
          </div>
        ) : (
          <div className="login-body">
            <h2 className="login-header">OTP Login</h2>
            <div className="form-div">
             
              <label htmlFor="">Enter the mobile no*</label>
              <PhoneInput
                country={"in"}
                value={phone}
                onChange={setPhone}
                
              />

             
              {errors.mobile && (
                <p style={{ color: "red" }}>Please check the Mobile No</p>
              )}
              <Button
                type="submit"
                className="otp-button mt-3"
                style={{ backgroundColor: "#0e7be8", color: "white" }}
                onClick={onSignup}
              >
                Send OTP via SMS
              </Button>
              {/* </Form> */}
            </div>
          </div>
        )}

        {/*  */}
      </div>
    </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>

    
  );
}

export default Otplogin;
