// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBL3_x5MwxbEBL6iFMwribsEiUO6mif-wI",
  authDomain: "study-ed594.firebaseapp.com",
  projectId: "study-ed594",
  storageBucket: "study-ed594.firebasestorage.app",
  messagingSenderId: "330053055074",
  appId: "1:330053055074:web:99b73f28cd151f5f3dd73b",
  measurementId: "G-9Y78G18MML"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);