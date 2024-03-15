import sum from "../../functions"
test("function sum add 1+2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3)
})