// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDxGxwXwXwXwXwXwXwXwXwXwXwXwXwXwXw",
    authDomain: "find-your-loved-one.firebaseapp.com",
    projectId: "find-your-loved-one",
    storageBucket: "find-your-loved-one.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890",
    measurementId: "G-ABCDEF1234"
  }
};

// Initialize Firebase
const app = initializeApp(environment.firebase);
const analytics = getAnalytics(app);