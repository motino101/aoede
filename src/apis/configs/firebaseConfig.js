import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
// Optionally import the services that you want to use

import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-6BvYgctE72_G5V-8jqgALBdN_grpA_0",
  authDomain: "aoede-f00ec.firebaseapp.com",
  projectId: "aoede-f00ec",
  storageBucket: "aoede-f00ec.appspot.com",
  messagingSenderId: "29763499477",
  appId: "1:29763499477:web:c84bd6b39063dfb3b5395c",
  measurementId: "G-4TT37G3E13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const database = getDatabase();
export { auth, analytics, database };

