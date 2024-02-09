import { createSlice } from "@reduxjs/toolkit";

export const favouritesSlice = createSlice({
    name: "favourites",
    initialState: {
        favourites: [],
    },
    reducers: {
        addFavourite(state, action) {
            if (state.favourites.some(favourite => favourite.name.common === action.payload.name.common)) {
                return;
            } else {
                state.favourites = [...state.favourites, action.payload];
            }
        },
        clearFavourite(state, action) {
            state.favourites = [];
        },
    },

});

export const { addFavourite, clearFavourite } = favouritesSlice.actions;

export default favouritesSlice.reducer;