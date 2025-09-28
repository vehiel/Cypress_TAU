import { forEach } from "cypress/types/lodash"

describe('Pruebas practicas con typeScript',()=>{
    var response
    before(()=>{
        //primero se busca los usuarios y los carga
        cy.obtenerUsuario().then((res)=>{
            console.log(res)
            response = res.body
        })
        
        /*cy.request('http://localhost:3000/user').then((responseUsuarios)=>{
            //console.log(response.body[1].name)
            //Se carga cada usuario para ser ingresado
            response = responseUsuarios.body;
            console.log(responseUsuarios.body[1].name)
        })*/
    })
    it('Agregar un nuevo elemento a la lista', ()=>{
        //visita la lista todo
        cy.visit('https://example.cypress.io/todo').then(()=>{
            response.forEach(element => {
                //agrega cada nombre
                cy.addNewItem(element.name)
            })
        });
        //cy.get('[placeholder="What needs to be done?"]')
        //cy.getByPlaceholder('What needs to be done?')
        //cy.addNewItem("holavehiel")  
    })
})
