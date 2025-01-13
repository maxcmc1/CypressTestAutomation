/// <reference types="cypress" />

describe('My First Test', () => {
    it('My FirstTest Case', () => {
      cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
      cy.get('.search-keyword').type('ca');
      cy.wait(2000);
      cy.get('.product').should('have.length', 5);
      cy.get('.product:visible').should('have.length', 4);

      cy.get('.products').as('productLocator')
      cy.get('@productLocator').find('.product').should('have.length', 4);
      cy.get('@productLocator').find('.product').eq(1).contains('ADD TO CART').click().then(function() {
        console.log('sf');
      });

      //Parent child chaining
      cy.get('@productLocator').find('.product').each(($el, index, $list) => {
        const textVeg = $el.find('h4.product-name').text();
        if(textVeg.includes('Cashews')){
            cy.wrap($el).find('button').click();
        }
      })

      // assert if logo text is correctly displayed
      cy.get('.brand').should('have.text', 'GREENKART')

      // handling log with 'then'
      cy.get('.brand').then(function(logoelement){
            cy.log(logoelement.text())
      })
    })
  })