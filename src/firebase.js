// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyDB8aRHmMQh8UQR4N3uFMRhJgTgD4hyKxU",
  authDomain: "senior-wellness-7f94c.firebaseapp.com",
  projectId: "senior-wellness-7f94c",
  storageBucket: "senior-wellness-7f94c.appspot.com",
  messagingSenderId: "294378337793",
  appId: "1:294378337793:web:58c51d0a76f851cf03f200",
  measurementId: "G-M9ZT41YZFY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
export {db};
export {app, auth};