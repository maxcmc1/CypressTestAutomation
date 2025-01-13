/// <reference types="cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe'
import HomePage  from '../../support/pageObjects/HomePage'

/*
Use these hadny commands when dubugging/troubleshooting:
      cy.pause() or
      cy.log(this.data.username)
*/

describe('End to End ecomerce Test', function () {

  before(function () {
    // runs once before all tests in this block
    cy.fixture('example').then(function (data) {
      this.data = data
      this.homepage = new HomePage()
    })
  })

  it('Submit Order', function () {

    const productName = this.data.productName
    this.homepage.goTo('https://rahulshettyacademy.com/loginpagePractise/')
    const productPage = this.homepage.login(this.data.username, this.data.password)
    productPage.pageValidation()
    productPage.getCartCount().should('have.length', 4)
    productPage.selectProduct(productName)
    productPage.selectFirstProduct()
    const cartPage = productPage.goToCart()
    cartPage.sumOfProducts().then(function (sum) {
      // ‘expect’ assertion (coming chai libraries)
      expect(sum).to.be.lessThan(200000)
    })
    const confirmationPage = cartPage.checkoutItems()
    confirmationPage.submitFormDeatils()
    confirmationPage.getAlertMessage().should('contain', 'Success')

    // moved into CartPage class
    // let sum = 0
    // cy.get('tr td:nth-child(4) strong')
    // .each($el=>{
    //   const amount = Number($el.text().split(" ")[1].trim())
    //   sum = sum + amount
    // }).then(() =>{
    //   //We are using ‘.then’ to make sure that previous line of code will be completed first (Synchronous way), and then move on to ‘expect’ assertion (coming chai libraries)
    //   expect(sum).to.be.lessThan(200000)
    // })

    // moved into ConfirmationPage class
    // cy.get('#country').type("India")
    // cy.get('.suggestions a', { timeout: 15000 }).click()
    // cy.get('input[value="Purchase"]').click()

    // moved into ConfirmationPage class
    // cy.get('.alert-success').should('contain', 'Success')

  })

})