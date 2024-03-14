import { createSlice } from "@reduxjs/toolkit";
import {
    addFavouriteToFirebase,
    auth,
    clearFavouritesFromFirebase,
    removeFavouriteFromFirebase,
} from "../auth/firebase";

// The favouritesSlice is a slice of the Redux store that contains the favourites state. It also contains the getFavourites, addFavourite, removeFavourite, and clearFavourites actions that are used to update the state.
export const favouritesSlice = createSlice({
    name: "favourites",
    initialState: {
        favourites: [],
    },
    // Reducers are functions that take the current state and an action as arguments, and return a new state result. In other words, (state, action) => newState.
    reducers: {
        //  The getFavourites action is used to update the state with the favourites from the payload.
        getFavourites(state, action) {
            state.favourites = action.payload;
        },
        // The addFavourite action is used to add a favourite to the state.
        addFavourite(state, action) {
            if (state.favourites.some((fav) => fav === action.payload))
                state.favourites = [...state.favourites];
            state.favourites = [...state.favourites, action.payload];

            const user = auth.currentUser;
            if (user) addFavouriteToFirebase(user.uid, action.payload);
        },
        // The removeFavourite action is used to remove a favourite from the state.
        removeFavourite(state, action) {
            const newArray = [...state.favourites];
            newArray.splice(
                newArray.findIndex((e) => e === action.payload),
                1
            );
            state.favourites = [...newArray];

            const user = auth.currentUser;
            if (user) {
                removeFavouriteFromFirebase(user.uid, action.payload);
            }
        },
        //  The clearFavourites action is used to clear all the favourites from the state.
        clearFavourites(state) {
            state.favourites = [];
            const user = auth.currentUser;
            if (user) {
                clearFavouritesFromFirebase(user.uid);
            }
        },


    },
});

export const { getFavourites, addFavourite, clearFavourites, removeFavourite } =
    favouritesSlice.actions;

export default favouritesSlice.reducer;
