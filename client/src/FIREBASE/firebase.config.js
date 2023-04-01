// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBJZkkf46z3KakdtLiLUgICIDlD46kdauM",
//   authDomain: "fir-otp-5835a.firebaseapp.com",
//   projectId: "fir-otp-5835a",
//   storageBucket: "fir-otp-5835a.appspot.com",
//   messagingSenderId: "750051663338",
//   appId: "1:750051663338:web:4ae148b4f4800c14f22693",
//   measurementId: "G-HR8X7GY416"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const auth = getAuth()
// // const analytics = getAnalytics(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
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
const provider = new GoogleAuthProvider();
export const auth = getAuth(app)
// const analytics = getAnalytics(app);