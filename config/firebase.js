// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDCMKjzxlvqGRQUD5KhWZTOYHiC8zas7ec",
  authDomain: "e-commerce-d1f24.firebaseapp.com",
  projectId: "e-commerce-d1f24",
  storageBucket: "e-commerce-d1f24.appspot.com",
  messagingSenderId: "184512589239",
  appId: "1:184512589239:web:da7235a0bea1faa6060c32",
  measurementId: "G-4ED2XP92DS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);