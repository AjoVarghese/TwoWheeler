
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { FacebookAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAO2LNeqONlaQr4IGL6sh-sG-4aEgA2CQU",
  authDomain: "fir-otp-4e4e2.firebaseapp.com",
  projectId: "fir-otp-4e4e2",
  storageBucket: "fir-otp-4e4e2.appspot.com",
  messagingSenderId: "355634062758",
  appId: "1:355634062758:web:5eeaf72110099cb5c99b67",
  measurementId: "G-GYK4XZBT08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export{auth,provider}
