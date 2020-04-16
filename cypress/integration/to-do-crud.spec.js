context.only("To Do App CRUD", () => {

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
    
    it('Add a task' , () => {

        cy.get('.taskText')
        .type("Cypress task")

        cy.get('.addButton')
        .click()

        cy.contains('Cypress task')

    })

    it('Complete a task', () => {

        cy.get('.PrivateSwitchBase-input-155')
        .click({ multiple: true })
        .should('be.checked')
        .click({ multiple: true })
    })

    it('Edit a task', () => {

        cy.get(':nth-child(4) > :nth-child(1) > :nth-child(1) > .MuiGrid-container > :nth-child(4) > [aria-label="edit"]')
        .click()

        cy.contains('Edit Task:')

        cy.get('.taskText')
        .type(" EDIT")

        cy.get('.editButton')
        .click()

        cy.contains('Cypress task EDIT')

        cy.contains('New Task:')
    })

    it('Delete a task', () => {

        cy.get(':nth-child(4) > :nth-child(1) > :nth-child(1) > .MuiGrid-container > :nth-child(4) > [aria-label="delete"]')
        .click()
        .should('not.exist')


    })

    it('Logout', () => {

        cy.get(':nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(4)')
        .click()

        cy.get('h1')
        .should('contain', 'Task Manager')
    })




})