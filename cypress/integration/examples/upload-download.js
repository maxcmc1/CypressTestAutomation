/// <reference types="cypress" />

describe('Upload-download test', function () {

    it('verify excel upload download', function () {

        const replaceNum = 170;
        const searchTextFruit = "Mango";
        const filePathValue = Cypress.config("fileServerFolder")+"/cypress/downloads/download.xlsx"
        cy.visit('https://rahulshettyacademy.com/upload-download-test/index.html')
        cy.get('#downloadButton').click();
        
        cy.task('writeExcelTest', {searchText: searchTextFruit, replaceText: replaceNum, change:{rowChange:0,colChange:2}, filePath: filePathValue})
        cy.get('#fileinput').selectFile(filePathValue)
        cy.contains(searchTextFruit).parent().parent().find("#cell-4-undefined").should('have.text',replaceNum)
    
    })

})