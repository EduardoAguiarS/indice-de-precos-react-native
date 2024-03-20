// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
export const firebaseConfig = {
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

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, user } from "firebase/auth";

const auth = getAuth();

export function useAuth() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
    return unsubscribe
  }, [])

  return { user }
}