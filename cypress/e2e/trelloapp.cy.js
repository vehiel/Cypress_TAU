/*it('my firts test', function () {
    cy.visit('http://localhost:3000/user');
});*/
it('my firts test', ()=>{
    cy.request('https://babelgroup.com/')//se usa el URl de babel porque trello app no funciono
})