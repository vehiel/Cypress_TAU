export{}
declare global {
    namespace Cypress {
        interface Chainable{
            /**
             * add a new item in the list
             * @param inputText text value
             * @example
             * //this command
             * cy.addNewItem('New Item Name')
             */
            addNewItem(inputText:string):
            Chainable<any>
        }
    }
}

Cypress.Commands.add('addNewItem',
    (inputText: string)=>{
        Cypress.log({
            displayName: 'addNewItem',
            message: inputText,
            consoleProps() {
                return {
                    selector:inputText
                }
            }
        })
    cy.getByPlaceholder('What needs to be done?').type(`${inputText}`).type('{enter}')
    //cy.get('[placeholder="What needs to be done?${input}"]')
    //cy.get(´[placeholder="${input}"]]´)
})