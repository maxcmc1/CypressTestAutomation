import CartPage from "./CartPage"

class ProductPage{

    pageValidation(){
        cy.contains('Shop Name').should('be.visible')
    }

    getCartCount(){
        return cy.get('app-card')
    }
    
    selectProduct(productName){
        // when we are adding '.then' we are resolving the promise    
        cy.get('app-card').filter(`:contains("${productName}")`)
        .then($element=>{

            cy.wrap($element).should('have.length', 1)
            cy.wrap($element).contains('button', 'Add').click()

        })
    }

    selectFirstProduct(){
        cy.get('app-card').contains('button', 'Add').click()
    }

    goToCart(){
        cy.contains('a', 'Checkout').click()
        return new CartPage()
    }
}
export default ProductPage;