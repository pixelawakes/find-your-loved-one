// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyArJ0l8HFnnEp4kWq1PD6R005EwRjjxJeg",
    authDomain: "find-your-loved-one.firebaseapp.com",
    projectId: "find-your-loved-one",
    storageBucket: "find-your-loved-one.firebasestorage.app",
    messagingSenderId: "626525109616",
    appId: "1:626525109616:web:23d975a9d871b459fea3b5",
    measurementId: "G-4PKYZDKWS4",
    databaseURL: "https://find-your-loved-one-default-rtdb.asia-southeast1.firebasedatabase.app"
  }
};

// Initialize Firebase
const app = initializeApp(environment.firebase);
const analytics = getAnalytics(app); 