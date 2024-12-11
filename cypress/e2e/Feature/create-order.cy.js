import testData from '../data.json'
import {total} from '../Feature/util'

describe ('Feature: create order',() => {
    const taxRate = 0.08

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/') // เข้าสู่ Website
        cy.task('writeLog','Navigated to website') // Log ข้อความเมื่อเข้าสู่ Website
    })

    it('Should complete the order process successfully',() => {

        // step 1: Login
        cy.get('#user-name').type('standard_user') // กรอก Username
        cy.get('#password').type('secret_sauce') // กรอก Password
        cy.get('#login-button').click() // คลิก Login
        cy.task('writeLog', 'Login completed successfully') // Log ข้อความหลังจาก Login

        cy.url().should('include','/inventory.html') // ไปหน้า Products
        cy.task('writeLog','Navigated to Products page') // Log ข้อความเมื่อเข้าสู่ Products page

        // step 2: Search and Add item to Cart

            // Add item: Backpack
        cy.contains('Backpack').should('be.visible') // ค้นหาชื่อสินค้า Backpack
        cy.task('writeLog','Search Backpack to Cart') // Log ข้อความเมื่อค้นหาชื่อสินค้า Backpack
        cy.get('#add-to-cart-sauce-labs-backpack').click() // เพิ่มสินค้าลงรถเข็น
        cy.task('writeLog','Added Backpack to Cart') // Log ข้อความเมื่อเพิ่ม Backpack ในตะกร้า

            // Add item: T-Shirt
        cy.contains('T-Shirt').should('be.visible') // ค้นหาชื่อสินค้า T-Shirt
        cy.task('writeLog','Search Backpack to Cart') // Log ข้อความเมื่อค้นหาชื่อสินค้า T-Shirt
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click() // เพิ่มสินค้าลงรถเข็น
        cy.task('writeLog','Added T-Shirt to Cart') // Log ข้อความเมื่อเพิ่ม T-Shirt ในตะกร้า
        
        cy.contains('T-Shirt (Red)').should('be.visible') // ค้นหาชื่อสินค้า T-Shirt (Red)
        cy.task('writeLog','Search T-Shirt (Red) to Cart') // Log ข้อความเมื่อค้นหาชื่อสินค้า T-Shirt (Red)
        cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click() // เพิ่มสินค้าลงรถเข็น
        cy.task('writeLog','Added T-Shirt (Red) to Cart') // Log ข้อความเมื่อเพิ่ม T-Shirt (Red) ในตะกร้า

            // Add item: Flashlight
        cy.contains('Flashlight').should('not.exist') // ตรวจสอบว่าไม่มีชื่อสินค้า Flashlight

        // Step 3: Verify Item in Cart
        cy.get('[data-test="shopping-cart-link"]').click() // คลิก open cart
        cy.url().should('include','/cart.html')  // ไปหน้า Your Cart
        cy.task('writeLog','Navigated to Cart page') // Log ข้อความเมื่อเข้าสู่ Cart page
        cy.contains('Backpack').should('be.visible') // ตรวจสอบว่า Backpack ถูกเพิ่ม
        cy.contains('T-Shirt').should('be.visible') // ตรวจสอบว่า T-Shirt ถูกเพิ่ม
        cy.contains('T-Shirt (Red)').should('be.visible')
        
            // Remove
        cy.get('[data-test="remove-sauce-labs-backpack"]').click() // ลบ Backpack (ทดสอบ Remove)
        cy.contains('Backpack').should('not.exist') // ยืนยันว่า Backpack ถูกลบ


        // Step 4: Proceed to Checkout
        cy.get('#checkout').click() // คลิก Checkout
        cy.url().should('include','/checkout-step-one.html') // ไปหน้า Checkout: Your Information
        cy.task('writeLog','Proceeded to Checkout Step 1') // Log ข้อความเมื่อเข้าสู่หน้า Checkout Step 1
        cy.get('#first-name').type('Linda')
        cy.get('#last-name').type('Sonna')
        cy.get('#postal-code').type('11120')
        cy.get('#continue').click() // กด Continue

        // Step 5: Verify and Confirm Order

            // Checkout: Overview 
        cy.url().should('include','/checkout-step-two.html') // ไปหน้า Confirm Order
        cy.task('writeLog','Proceeded to Checkout Step 2') // Log ข้อความเมื่อเข้าสู่หน้า Checkout Step 2
            
            // ตรวจสอบภาษีและยอดรวม
        cy.get('[data-test="subtotal-label"]').invoke('text').then((priceText) => {
            //cy.log(priceText);
    
            const price = parseFloat(priceText.replace('Item total: $', ''))
            //cy.log(price)
            const tax = price * taxRate
            //cy.log(tax)
            const total = price + tax
            //cy.log(total)

        cy.get('[data-test="tax-label"]').should('contain',tax.toFixed(2)) // ภาษี
        cy.task('writeLog', `Verified tax: ${tax.toFixed(2)}`) // Log tax verification
        cy.get('[data-test="total-label"]').should('contain',total.toFixed(2)) // ราคารวม
        cy.task('writeLog',`Verified total price: ${total.toFixed(2)}`) // Log total price verification
        })

        cy.get('#finish').click() // คลิกสั่งซื้อ
        cy.url().should('include','/checkout-complete.html') // ไปหน้า Checkout: Complete!
        cy.get('[data-test="complete-header"]').should('have.text','Thank you for your order!') // ข้อความยืนยัน เมื่อคำสั่งซื้อสำเร็จ
        cy.task('writeLog','Order completed successfully') // Log ข้อความเมื่อ Order completed
          
    })
})