describe ('feature: create order',() => {
    //beforeEach(() => {
        //cy.visit('https://www.saucedemo.com/')
    })

    it('Should complete the order process successfully',() => {
        cy.visit('https://www.saucedemo.com/')

        //step 1: Login
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()

        //step 2: Search and Add item to Cart

           //item: Backpack
        cy.get('[data-test="item-4-title-link"] > [data-test="inventory-item-name"]').should('have.text','Sauce Labs Backpack')
        cy.get('[data-test="item-4-title-link"] > [data-test="inventory-item-name"]').click()
        cy.get('#add-to-cart').click()
        cy.get('[data-test="back-to-products"]').click()

           //item: T-Shirt
        cy.get('#item_1_title_link').should('have.text','Sauce Labs Bolt T-Shirt')
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()

        cy.get('#item_3_title_link').should('have.text','Test.allTheThings() T-Shirt (Red)')
        cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click()

        // Step 3: Verify Item in Cart
        cy.get('[data-test="shopping-cart-link"]').click()

        // Step 4: Proceed to Checkout

           // Remove Backpack from Cart
        

        // Step 5: Fill Buyer Information

        // Step 6: Verify Order Summary

        // Step 7: Confirm Order
        

        
    

})