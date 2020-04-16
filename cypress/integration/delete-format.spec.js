context.only("Check text format after delete", () => {

    it('login', () => {
        cy.visit('http://localhost:3000')

        cy.get('[type="email"]')
            .type('test.com')

        cy.get('[type="password"]')
            .type('test')

        cy.get('button.MuiButtonBase-root')
            .click()

        cy.get('h4')
            .should('contain', "test user's Tasks:")

    })

    it('Add two task tasks', () => {

        cy.get('.taskText')
            .type("Cypress task")

        cy.get('.addButton')
            .click()

        cy.contains('Cypress task')

        cy.get('.taskText')
            .type("Cypress task 2")

        cy.get('.addButton')
            .click()

        cy.contains('Cypress task 2')

    })

    it('Delete a task and check last task style', () => {

        cy.get(':nth-child(4) > :nth-child(1) > :nth-child(1) > .MuiGrid-container > :nth-child(4) > [aria-label="delete"]')
            .click()

        cy.wait(500)

        cy.contains('Cypress task 2')
            .should('not.have.attr', 'style')

    })

    it("Delete last test task", () => {
        //clean up
        cy.get(':nth-child(4) > :nth-child(1) > :nth-child(1) > .MuiGrid-container > :nth-child(4) > [aria-label="delete"]')
            .click()

    })

})