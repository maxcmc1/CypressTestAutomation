/// <reference types="cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe'

describe('Handling i-frame', () => {

    it('Should handle i-frame', () => {

      cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
      cy.frameLoaded('#courses-iframe')
      cy.iframe().find('.header-upper ul a[href="mentorship"]').click()
      cy.wait(5000)
      //cy.iframe().find('h1[class*="pricing-title"]', { timeout: 15000 }).should('exist')

      cy.iframe().find('h1[class*="pricing-title"]').should('have.length', 2)

    })

  })