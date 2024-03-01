import { createSlice } from "@reduxjs/toolkit";

export const favouritesSlice = createSlice({
    name: "favourites",
    initialState: {
        favourites: [],
    },
    reducers: {
        addFavourite(state, action) {
            if (
                state.favourites.some(
                    (favourite) => favourite.name.common === action.payload.name.common)) {
                return;
            } else {
                state.favourites = [...state.favourites, action.payload];
            }
        },
        removeFavourite(state, action) {
            state.favourites = state.favourites.filter(
                (favourite) => favourite.name.common !== action.payload.name.common);
        },

        clearAllFavourite(state, action) {
            state.favourites = [];
        },
    },

});

export const { addFavourite, clearAllFavourite, removeFavourite } = favouritesSlice.actions;

export default favouritesSlice.reducer;