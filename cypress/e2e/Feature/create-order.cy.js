import testData from '../data.json'
import {total} from '../Feature/util'

describe ('Feature: create order',() => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
    })

    it('Should complete the order process successfully',() => {
        //cy.visit('https://www.saucedemo.com/')

        // step 1: Login
        cy.get('#user-name').type('standard_user') // กรอก Username
        cy.get('#password').type('secret_sauce') // กรอก Password
        cy.get('#login-button').click() // คลิก Login
        cy.url().should('include','/inventory.html') // ไปหน้า Products

        // step 2: Search and Add item to Cart

            // Add item: Backpack
        cy.contains('Backpack').should('be.visible') // ค้นหาชื่อสินค้า Backpack
        cy.get('#add-to-cart-sauce-labs-backpack').click() // เพิ่มสินค้าลงรถเข็น
        //cy.get('[data-test="item-4-title-link"] > [data-test="inventory-item-name"]').click() // คลิกเพื่อดูรายละเอียดสินค้า
        //cy.get('#add-to-cart').click() // เพิ่มสินค้าลงรถเข็น
        //cy.get('[data-test="back-to-products"]').click() //กลับไปหน้ารายการสินค้า

            // Add item: T-Shirt
        cy.contains('T-Shirt').should('be.visible') // ค้นหาชื่อสินค้า T-Shirt
        //cy.get('#item_1_title_link').should('have.text','Sauce Labs Bolt T-Shirt') // ตรวจสอบชื่อสินค้า
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click() // เพิ่มสินค้าลงรถเข็น
        
        cy.contains('T-Shirt (Red)').should('be.visible') // ค้นหาชื่อสินค้า T-Shirt (Red)
        cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click() // เพิ่มสินค้าลงรถเข็น

            // Add item: Flashlight
        cy.contains('Flashlight').should('not.exist') // ตรวจสอบว่าไม่มีชื่อสินค้า Flashlight

        // Step 3: Verify Item in Cart
        cy.get('[data-test="shopping-cart-link"]').click() // open cart
        cy.url().should('include','/cart.html')  // ไปหน้า Your Cart
        cy.contains('Backpack').should('be.visible') // ตรวจสอบว่า Backpack ถูกเพิ่ม
        cy.contains('T-Shirt').should('be.visible') // ตรวจสอบว่า T-Shirt ถูกเพิ่ม
        cy.contains('T-Shirt (Red)').should('be.visible')
        
            // Remove
        cy.get('[data-test="remove-sauce-labs-backpack"]').click() // ลบ Backpack (ทดสอบ Remove)
        cy.contains('Backpack').should('not.exist') // ยืนยันว่า Backpack ถูกลบ


        // Step 4: Proceed to Checkout
        cy.get('#checkout').click() // คลิก Checkout
        cy.url().should('include','/checkout-step-one.html') // ไปหน้า Checkout: Your Information

        cy.get('#first-name').type('Linda')
        cy.get('#last-name').type('Sonna')
        cy.get('#postal-code').type('11120')
        cy.get('#continue').click() // ส่งข้อมูล

        // Step 5: Verify and Confirm Order

        // Checkout: Overview 
        cy.url().should('include','/checkout-step-two.html') // ไปหน้า Confirm Order
        // 
        // cy.get('[data-test="subtotal-label"]') // 
            
            // ตรวจสอบภาษีและยอดรวม
        cy.get('[data-test="subtotal-label"]').invoke('text').then((priceText) => {
    
            const price = parseFloat(priceText.replace('$', ''))
            const tax = price * (testData.taxRate)
            const total = price * tax
            //total(price,tax)

        cy.get('[data-test="subtotal-label"]').should('contain',total) // ราคารวม
        // ภาษี
        })

        // คลิกสั่งซื้อ
        // https://www.saucedemo.com/checkout-complete.html // ไปหน้า order su------
        // ข้อความยืนยัน เมื่อคำสั่งซื้อสำเร็จ

        // Step 6: Log Test Results

          
    })
})