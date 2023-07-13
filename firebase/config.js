import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCBKZlyDtoJ5mp6FojfhfPY33ZwLDHTfnw",
  authDomain: "hw-go-it-react-native.firebaseapp.com",
  projectId: "hw-go-it-react-native",
  storageBucket: "hw-go-it-react-native.appspot.com",
  messagingSenderId: "417180274557",
  appId: "1:417180274557:web:eaca2f69da5d70d63ac614",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
