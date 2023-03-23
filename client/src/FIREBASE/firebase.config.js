import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyDht3cM2Nx8WK2uFhfaZCry-LtQi_f3yBE",
    authDomain: "fir-auth-29a73.firebaseapp.com",
    projectId: "fir-auth-29a73",
    storageBucket: "fir-auth-29a73.appspot.com",
    messagingSenderId: "456107701252",
    appId: "1:456107701252:web:37770b3b9f269294b87151"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  export const auth = getAuth(app)