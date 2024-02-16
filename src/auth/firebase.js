import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API,
    authDomain: "countries-f2546.firebaseapp.com",
    projectId: "countries-f2546",
    storageBucket: "countries-f2546.appspot.com",
    messagingSenderId: "345028026141",
    appId: "1:345028026141:web:b80a8e04e2b49787f9cbf4"
};


export const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
};

export const loginWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
};

export const logout = () => {
    auth.signOut();
};

export { auth, db, registerWithEmailAndPassword };
