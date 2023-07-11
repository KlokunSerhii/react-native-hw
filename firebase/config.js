import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCy2akrMPfvyuG7o8gNS3_88F-BFZuL2Fo",
  authDomain: "react-798a0.firebaseapp.com",
  databaseURL: "https://react-798a0-default-rtdb.firebaseio.com",
  projectId: "react-798a0",
  storageBucket: "react-798a0.appspot.com",
  messagingSenderId: "303201600676",
  appId: "1:303201600676:web:fa13003bf0e65e62649231",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
