import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor"
import HomePage from "../../../../support/pageObjects/HomePage"
const homepage = new HomePage()


Given('I am on Ecommerce page', ()=>{
    homepage.goTo(Cypress.env('url') + '/loginpagePractise/')
})

When('I login to the application', ()=>{
    this.productPage = homePage.login(this.data.username, this.data.password)
    productPage.pageValidation()
    productPage.getCartCount().should('have.length', 4)
})

When('I add items to Cart and checkout', function(){
    this.productPage.selectProduct(productName)
    this.productPage.selectFirstProduct()
    this.cartPage = productPage.goToCart()
})

When('Validate the total price limit', function(){
    this.cartPage.sumOfProducts().then(function (sum) {
        // ‘expect’ assertion (coming chai libraries)
        expect(sum).to.be.lessThan(200000)
    })
})

Then('Select the country submit and verify Thankyou', function(){
    const confirmationPage = cartPage.checkoutItems()
    confirmationPage.submitFormDeatils()
    confirmationPage.getAlertMessage().should('contain', 'Success')
})