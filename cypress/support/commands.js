// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('RequestAPI', (method, url, idUser= 0, body = 0)=>{
  if (idUser === 0) {
    idUser = ''
  }
  
  cy.request({
    method:method,
    url: url + '/' + idUser,
    auth:{bearer: Cypress.env('APIKEY')},
    body: body
  })
})

Cypress.Commands.add("ValidateCode", (response, code)=>{
  expect(response.status).to.eq(code)
})