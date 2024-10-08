import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/recaptcha-verifier";

const firebaseConfig = {
  apiKey: "AIzaSyBC_MYwrZikd1-vTuXzbLBmP5br-gEuzDc",
  authDomain: "fir-project-3-68794.firebaseapp.com",
  databaseURL: "https://fir-project-3-68794-default-rtdb.firebaseio.com",
  projectId: "fir-project-3-68794",
  storageBucket: "fir-project-3-68794.appspot.com",
  messagingSenderId: "156285108510",
  appId: "1:156285108510:web:d1997fe58a87e38d3e890f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, firebase };
