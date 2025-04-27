// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:"AIzaSyAo3rU5GIk2emeEep1Aj_BSkussbtOU00w",
  authDomain: "fitness-tracker-bb8fe.firebaseapp.com",
  projectId: "fitness-tracker-bb8fe",
  storageBucket: "fitness-tracker-bb8fe.firebasestorage.app",
  messagingSenderId: "987672625039",
  appId: "1:987672625039:web:d90a15bacf41c2c1a455fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();