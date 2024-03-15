import countries from "../services/countries"

test("getALL returns all countries from the API", async () => {
    // call the getAll function from the countries service
    const data = await countries.getAll()

    // check that the data is an array
    expect(Array.isArray(data)).toBe(true)

    // check that the data is not empty
    data.forEach(country => {
        expect(country).toHaveProperty("name")
        expect(country).toHaveProperty("population")
        expect(country).toHaveProperty("flags")
        expect(country).toHaveProperty("area")
    })
})



