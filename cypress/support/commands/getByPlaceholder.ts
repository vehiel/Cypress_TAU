import { Placeholders } from "../typings/placeholders";
declare global {
    namespace Cypress {
        interface Chainable{
            /**
             * get a DOM element based on placeholder value
             * @param input placeholder text value
             * @example
             * //this command
             * cy.getPlaceholder('your email')
             * will select this element
             * <input placeholder="your email" />
             * Vehiel estuvo aquí
             */
            getByPlaceholder(input:Placeholders):
            Chainable<any>
        }
    }
}

Cypress.Commands.add('getByPlaceholder',
    (input: Placeholders)=>{
        Cypress.log({
            displayName: 'getByPlaceholder',
            message: input,
            consoleProps() {
                return {
                    selector:input
                }
            }
        })
    return cy.get(`[placeholder="${input}"] `,{
        log: false
    })
    //cy.get('[placeholder="What needs to be done?${input}"]')
    //cy.get(´[placeholder="${input}"]]´)
})