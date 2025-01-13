import ConfirmationPage from "./ConfirmationPage"

class CartPage {

    sumOfProducts() {
        let sum = 0
        return cy.get('tr td:nth-child(4) strong')
                .each($el => {
                    const amount = Number($el.text().split(" ")[1].trim())
                    sum = sum + amount
                }).then(() => {
                    //We are using ‘.then’ to make sure that previous line of code will be completed first (Synchronous way), and then move on to 'return sum'
                    return sum
                })
    }

    checkoutItems() {
        cy.contains('button', 'Checkout').click()
        return new ConfirmationPage()
    }

}
export default CartPage;