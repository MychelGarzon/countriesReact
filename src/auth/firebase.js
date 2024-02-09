import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_KEY,
    authDomain: "countries-f2546.firebaseapp.com",
    projectId: "countries-f2546",
    storageBucket: "countries-f2546.appspot.com",
    messagingSenderId: "345028026141",
    appId: "1:345028026141:web:b80a8e04e2b49787f9cbf4"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)

