import { configureStore } from "@reduxjs/toolkit";
import countriesService from "../services/countries";
import countriesSlice, { initializeCountries } from "../store/countriesSlice";

jest.mock("../services/countries");

describe("countriesSlice tests", () => {
    let store;
    beforeEach(() => {
        store = configureStore({
            reducer: {
                countries: countriesSlice
            }
        })
    })
    it("should initialize countries in the store", () => {
        const { countries, isLoading } = store.getState().countries;
        expect(countries).toHaveLength(0);
        expect(isLoading).toBe(true);
    });
    it("should handle countries", () => {
        store.dispatch({
            type: "countries/getCountries",
            payload: ["country 1", "country 2"]
        });
        expect(store.getState().countries.countries).toEqual([
            "country 1",
            "country 2"
        ]);
        expect(store.getState().countries.isLoading).toEqual(false);
    });
    it("should handle initialCountries", async () => {
        const mockCountries = ["country 1", "country 2"];

        countriesService.getAll.mockResolvedValue(mockCountries);

        await store.dispatch(initializeCountries());
        expect(store.getState().countries.countries).toEqual(mockCountries);
        expect(store.getState().countries.isLoading).toEqual(false);

    })
})