/// <reference types="cypress" />

describe('Backend Test Suite', function () {

    it('Database Interaction', function () {

        cy.sqlServer("select * from Persons").then(function(result){
            console.log(result[0][0])
        })
    })

})