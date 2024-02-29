// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfJ2EsHrKr-YuFHpOHFGi_9Hw_WtBZdSk",
  authDomain: "rn-realtime-db.firebaseapp.com",
  databaseURL: "https://rn-realtime-db-default-rtdb.firebaseio.com",
  projectId: "rn-realtime-db",
  storageBucket: "rn-realtime-db.appspot.com",
  messagingSenderId: "99880564692",
  appId: "1:99880564692:web:c78450dca749635f534841"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);