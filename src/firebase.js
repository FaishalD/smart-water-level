// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Ganti konfigurasi ini dengan yang dari Firebase Console project kamu
const firebaseConfig = {
  apiKey: "AIzaSyDvmTrKNL3q4bmSoDWgeOmmlcTGHaISfYs",
  authDomain: "smart-water-level-a7e0f.firebaseapp.com",
  projectId: "smart-water-level-a7e0f",
  storageBucket: "smart-water-level-a7e0f.firebasestorage.app",
  messagingSenderId: "247315046289",
  appId: "1:247315046289:web:90ff70af90e14624ba4430",
  measurementId: "G-CZFX2CNQ1Q",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
