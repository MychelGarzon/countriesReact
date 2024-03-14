import { createSlice } from "@reduxjs/toolkit";
import countriesService from "../services/countries";

// The initializeCountries function is an asynchronous function that takes the dispatch function as a parameter and fetches the countries from the countriesService. It then dispatches the getCountries action with the countries as a payload. After that, it dispatches the isLoading action with the value false as a payload after 1000 milliseconds.
export const initializeCountries = () => {
    return async (dispatch) => {
        const countries = await countriesService.getAll();
        dispatch(getCountries(countries));
        setTimeout(() => {
            dispatch(isLoading(false));
        }, 1000);
    };
};
//  The countriesSlice is a slice of the Redux store that contains the countries and isLoading state. It also contains the getCountries and isLoading actions that are used to update the state.
export const countriesSlice = createSlice({
    name: "countries",
    initialState: {
        countries: [],
        isLoading: true,
    },
    reducers: {
        getCountries(state, action) {
            state.countries = action.payload;
            state.isLoading = false;
        },
        isLoading(state, action) {
            state.isLoading = action.payload;
        }
    }
});

export const { getCountries, isLoading } = countriesSlice.actions;

export default countriesSlice.reducer;