/// <reference types="cypress" />
const neatCSV = require('neat-csv');
let productName
describe('JWT Session', () => {

    it('Is logged in through local storage', async () => {

        cy.LoginAPI().then(function () {
            cy.visit("https://rahulshettyacademy.com/client", {
                onBeforeLoad: function (window) {
                    window.localStorage.setItem('token', Cypress.env('token'))
                }
            })
        })

        cy.get(".card-body b").eq(1).then(function (el) {
            productName = el.text()
        })

        cy.get(".card-body button:last-of-type").eq(1).click()
        cy.get("[routerlink*='cart']").click()
        cy.contains("Checkout").click()
        cy.get("[placeholder*='Country']").type("ind")

        cy.get('.ta-results button').each(($e1, index, $list) => {

            if ($e1.text() === " India") {
                cy.wrap($e1).click()
            }

        })

        cy.get(".action__submit").click()
        cy.wait(2000)
        cy.get(".order-summary button").contains("Excel").click()

        const filePath = Cypress.config("fileServerFolder")+"/cypress/downloads/order-invoice_maks.seli.qa.xlsx"
        cy.task('excelToJsonConverter', filePath).then(function(result){
            cy.log(result.data[1].A);
            expect(productName).to.equal(result.data[1].B)
        })

        // The method below is just to verify that text is present in the file (excel). It is a generic and can be applied to any file like CSV/EXCEL, etc.
        cy.readFile(filePath).then(function(text){
            expect(text).to.include(productName)
        })

        // Browser (Engine) - JS code -> Client Side Environment (Front end) - Cypress

        // Node (Engine) - JS code -> Back End application/Environment
        // Accessing files - fs, DB access

        // Task - (Files, DB) -> Config.js, (ExcelToJson) -> cy.task(ExcelToJson)
    })

})