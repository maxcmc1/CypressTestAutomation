/// <reference types="cypress" />

describe('Handling Child Windows option 2', () => {

    it('Should handle child windows option 2', () => {

      cy.visit('https://rahulshettyacademy.com/AutomationPractice/');

      cy.get('#opentab').then(function(el){
        const url = el.prop('href')
        cy.visit(url) // https://www.qaclickacademy.com/
        cy.origin(url, ()=> {
          cy.get('#navbarSupportedContent a[href*="about"]').click()
          cy.get('#about-page h2').should('contain', 'QAClick Academy')
        })

      })
    })

  })