describe("Login and search for a country", () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/')
        cy.get("button").contains("Login").click()

    })
    it("Login with valid credentials", () => {
        cy.get("input[placeholder='Email']").type("abc@abc.abc")
        cy.get('[data-id="password-login"]').type("abcabcabc")
        cy.get('[data-id="login-button"]').click();

    })

    it("Go to countries", () => {
        cy.get('[data-id="countries-button"]').click();
    })
    it("Search a country", () => {
        cy.get("input[placeholder='Search for countries']").type("Colombia")

    })


})
