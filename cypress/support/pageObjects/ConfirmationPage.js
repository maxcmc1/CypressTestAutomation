class ConfirmationPage{

    submitFormDeatils(){
        cy.get('#country').type("India")
        cy.get('.suggestions a', { timeout: 15000 }).click()
        cy.get('input[value="Purchase"]').click()

        // below is Cypress custom command which can be reused within the whole project (automation framework). It is the same code as above, and
        // it is located in support/commands file
        // cy.submitFormDeatils()
    }

    getAlertMessage(){
        return cy.get('.alert-success')
    }

}
export default ConfirmationPage