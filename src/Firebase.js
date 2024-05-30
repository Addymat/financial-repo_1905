// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1i5fBchw4DS_8vxTlWsgkGo-4ZrlkEkA",
  authDomain: "netpt-32cfd.firebaseapp.com",
  projectId: "netpt-32cfd",
  storageBucket: "netpt-32cfd.appspot.com",
  messagingSenderId: "554356263243",
  appId: "1:554356263243:web:ef2bf453a3803b5a0600ce",
  measurementId: "G-63RY700T7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();