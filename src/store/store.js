import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";
import favouritesReducer from "./favouritesSlice";

// The configureStore function is used to create a Redux store with the countries and favourites reducers.
export default configureStore({

    reducer: {
        countries: countriesReducer,
        favourites: favouritesReducer,
    },
});

