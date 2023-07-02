import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBhDR4sME6tbECRreIwP0cmx3TC57HgDbM",
  authDomain: "native-project-936b7.firebaseapp.com",
  databaseURL:
    "https://native-project-936b7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "native-project-936b7",
  storageBucket: "native-project-936b7.appspot.com",
  messagingSenderId: "262853373225",
  appId: "1:262853373225:web:9d5260d9fcae1ceb71db38",
  measurementId: "G-X35DX2VY07",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
