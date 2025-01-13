/// <reference types="cypress" />

describe('My Fourth Test', () => {

    it('My FourthTest Case', () => {

      cy.visit('https://rahulshettyacademy.com/AutomationPractice/');

      // alert popups
      cy.get('#alertbtn').click()
      cy.get('[value="Confirm"]').click()

      cy.on('window:alert', (str) => {
        // Mocha assertion
        expect(str).to.equal('Hello , share this practice page and share your knowledge')
      })

      cy.on('window:confirm', (str) => {
        // Mocha assertion
        expect(str).to.equal('Hello , Are you sure you want to confirm?')
      })

    })

  })