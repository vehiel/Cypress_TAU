export{}
declare global {
    namespace Cypress {
        interface Chainable{
            /**
             * go to user url to get the user list name
             * @example
             * //this command
             * cy.obtenerUsuario()
             */
            obtenerUsuario():
            Chainable<any>
        }
    }
}

Cypress.Commands.add('obtenerUsuario',
    ()=>{
        Cypress.log({
            displayName: 'addNewItem',
            message: "",
            consoleProps() {
                return {
                    selector:"Va a /user"
                }
            }
        })
        var response
            cy.request('http://localhost:3000/user').then((responseUsuarios)=>{
            //console.log(response.body[1].name)
            //Se carga cada usuario para ser ingresado
            console.log(responseUsuarios.body[1].name)
            response= responseUsuarios.body;
        })
        return response
})