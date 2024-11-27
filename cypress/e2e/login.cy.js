describe ('login',() => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
    })

    it('Should complete the order process successfully',() => {
        //cy.visit('https://www.saucedemo.com/')

        //step 1: Login
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()

        //step 2: Search and Add item to Cart
        

        
    })

})