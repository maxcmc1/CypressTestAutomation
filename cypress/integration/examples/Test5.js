/// <reference types="cypress" />

describe('Handling Child Windows', () => {

    it('Should handle child windows', () => {

      cy.visit('https://rahulshettyacademy.com/AutomationPractice/');

      cy.get('#opentab').invoke('removeAttr', 'target').click()

      cy.origin('https://www.qaclickacademy.com', () => {
        cy.get('#navbarSupportedContent a[href*="about"]').click()
        cy.get('#about-page h2').should('contain', 'QAClick Academy')
      })
    })

  })