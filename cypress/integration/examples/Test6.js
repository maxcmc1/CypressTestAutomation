/// <reference types="cypress" />

describe('Handling Web tables Windows', () => {

    it('Should web tables windows', () => {

      cy.visit('https://rahulshettyacademy.com/AutomationPractice/');

      // web table
      cy.get('table[name="courses"] tr td:nth-child(2)').each(($el, index, $list) =>{
        
        const text = $el.text()
        if(text.includes('Python')){
          
          cy.get('table[name="courses"] tr td:nth-child(2)').eq(index).next().then(function(price){
            
            const priceText = price.text()
            expect(priceText).to.equal('25')
          })
        }
      })
    })

  })