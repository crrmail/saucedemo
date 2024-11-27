describe ('feature: create order',() => {
    //beforeEach(() => {
        //cy.visit('https://www.saucedemo.com/')
    })

    it('Should complete the order process successfully',() => {
        cy.visit('https://www.saucedemo.com/')

        //step 1: Login
        cy.get('#user-name').type('standard_user') // กรอก Username
        cy.get('#password').type('secret_sauce') // กรอก Password
        cy.get('#login-button').click() // คลิก Login

        //step 2: Search and Add item to Cart

           //item: Backpack
        cy.get('[data-test="item-4-title-link"] > [data-test="inventory-item-name"]').should('have.text','Sauce Labs Backpack') // ตรวจสอบชื่อสินค้า
        cy.get('[data-test="item-4-title-link"] > [data-test="inventory-item-name"]').click() // คลิกเพื่อดูรายละเอียดสินค้า
        cy.get('#add-to-cart').click() // เพิ่มสินค้าลงรถเข็น
        cy.get('[data-test="back-to-products"]').click() //กลับไปหน้ารายการสินค้า

           //item: T-Shirt
        cy.get('#item_1_title_link').should('have.text','Sauce Labs Bolt T-Shirt') // ตรวจสอบชื่อสินค้า
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click() // เพิ่มสินค้าลงรถเข็น

        cy.get('#item_3_title_link').should('have.text','Test.allTheThings() T-Shirt (Red)') // ตรวจสอบชื่อสินค้า
        cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click() // เพิ่มสินค้าลงรถเข็น

        // Step 3: Verify Item in Cart
        cy.get('[data-test="shopping-cart-link"]').click() //open cart
        cy.contains('T-Shirt').should('be.visible') // ตรวจสอบว่า T-Shirt ถูกเพิ่ม
        cy.contains('Backpack').should('be.visible') // ตรวจสอบว่า Backpack ถูกเพิ่ม
        cy.get('[data-test="remove-sauce-labs-backpack"]').click() // ลบ Backpack (ทดสอบ Remove)
        cy.contains('Backpack').should('not.exist') // ยืนยันว่า Backpack ถูกลบ


        // Step 4: Proceed to Checkout
        cy.get('#checkout') // คลิก Checkout
        
        // Step 5: Fill Buyer Information

        // cy.get('#first-name')
        // cy.get('#last-name')
        // cy.get('#postal-code')


        // Step 6: Verify Order Summary

        // Step 7: Confirm Order
        

        
    

})