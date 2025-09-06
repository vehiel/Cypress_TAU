it('my firts test', ()=>{
    cy.visit('https://example.cypress.io/todo')
    //cy.get('[placeholder="What needs to be done?"]')
    //cy.getByPlaceholder('What needs to be done?')
    cy.addNewItem("holavehiel")
    
})