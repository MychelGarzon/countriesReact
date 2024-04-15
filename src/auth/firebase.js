import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
} from "firebase/auth";
import {
    addDoc,
    collection,
    deleteDoc,
    getDocs,
    getFirestore,
    query,
    where,
} from "firebase/firestore";
import { getFavourites } from "../store/favouritesSlice";
import { getAnalytics } from "firebase/analytics";

// Here we initialize the app with the firebaseConfig object
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API,
    authDomain: "countries-f2546.firebaseapp.com",
    projectId: "countries-f2546",
    storageBucket: "countries-f2546.appspot.com",
    messagingSenderId: "345028026141",
    appId: "1:345028026141:web:b80a8e04e2b49787f9cbf4",
    measurementId: "G-QFMMC3190L"
};

// The initializeApp function initializes the app with the firebaseConfig object.
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// The registerWithEmailAndPassword function is an asynchronous function that takes the name, email, and password as parameters and creates a new user with the createUserWithEmailAndPassword function from the firebase/auth module.
const registerWithEmailAndPassword = async (name, email, password, avatar) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
            avatar,
        });
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
};
// The loginWithEmailAndPassword function is an asynchronous function that takes the email and password as parameters and logs in the user with the signInWithEmailAndPassword function from the firebase/auth module.
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
// The getNameOfUser function is an asynchronous function that takes the user as a parameter and returns the name of the user from the Firebase database.
export const getNameOfUser = async (user) => {
    if (user) {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const name = doc.data().name;
            return name;
        });
    } else {
        return null;
    }
};
// The addFavouriteToFirebase function is an asynchronous function that takes the uid and name as parameters and adds the name to the favourites collection in the Firebase database.
export const addFavouriteToFirebase = async (uid, name) => {
    try {
        await addDoc(collection(db, `users/${uid}/favourites`), { name });
    } catch (err) {
        console.error("Error adding favourite to Firebase database: ", err);
    }
};
// The removeFavouriteFromFirebase function is an asynchronous function that takes the uid and name as parameters and removes the name from the favourites collection in the Firebase database.
export const removeFavouriteFromFirebase = async (uid, name) => {
    try {
        if (!name) {
            console.error(
                "Error removing favourite from Firebase database: name parameter is undefined"
            );
            return;
        }
        const q = query(
            collection(db, `users/${uid}/favourites`),
            where("name", "==", name)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
        });
    } catch (err) {
        console.error("Error removing favourite from Firebase database: ", err);
    }
};
// The clearFavouritesFromFirebase function is an asynchronous function that takes the uid as a parameter and removes all the favourites from the favourites collection in the Firebase database.
export const clearFavouritesFromFirebase = async (uid) => {
    try {
        const q = query(collection(db, `users/${uid}/favourites`));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
        });
    } catch (err) {
        console.error("Error removing favourites from Firebase database: ", err);
    }
};
// The getFavouritesFromSource function is an asynchronous function that takes the dispatch function as a parameter and gets the favourites from the favourites collection in the Firebase database.
export const getFavouritesFromSource = () => async (dispatch) => {
    const user = auth.currentUser;
    if (user) {
        const q = await getDocs(collection(db, `users/${user.uid}/favourites`));
        const favourites = q.docs.map((doc) => doc.data().name);
        dispatch(getFavourites(favourites));
    }
};
export const analytics = getAnalytics(app);

console.log("db", db);
console.log("analytics", analytics);



export { auth, db, registerWithEmailAndPassword, firebaseConfig };
