describe("Countries Home Page", () => {
    it("Home visible", () => {
        cy.visit('http://localhost:5173/')
        cy.get('h1').should('have.text', 'Home')
    })

})

