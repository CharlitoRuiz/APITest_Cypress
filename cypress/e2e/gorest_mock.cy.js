/// <reference types="cypress"/>
describe('API Testing with Mock', () => {

  it('Get with mock data', () => {
    cy.intercept('GET', 'https://gorest.co.in/public/v2/users', 
    {statusCode: 200,fixture: 'mock.json' }).as('getData').then(()=>{
      fetch("https://gorest.co.in/public/v2/users", { method: "GET" })
    })
    cy.wait('@getData').then((response)=>{
        expect(response.response.statusCode).to.eq(200)
        expect(response.response.body[0].name).to.eq("Carlos Ruiz Mock")
      })
    })

    it('Get error status code', () => {
      cy.intercept('GET', 'https://gorest.co.in/public/v2/users', 
      {statusCode: 404, body: '404 Not Found!', headers: {'x-not-found': 'true',}}).as('getData').then(()=>{
        fetch("https://gorest.co.in/public/v2/users", { method: "GET" })
      })
      cy.wait('@getData').then((response)=>{
          expect(response.response.statusCode).to.eq(404)
        })
      })

    it('Post with mock data', () => {
      cy.intercept('POST', 'https://gorest.co.in/public/v2/users', (req)=>{
        req.headers['x-custom-header'] = 'added by cy.intercept'
        req.reply({
          statusCode: 201,
          fixture: 'mock.json',
          headers: {'x-custom-header' : 'added by cy.intercept'}
        })
      }).as('postData').then(()=>{
        fetch("https://gorest.co.in/public/v2/users", { method: 'POST' })
      })
      cy.wait('@postData').then((res)=>{
          expect(res.response.statusCode).to.eq(201)
          expect(res.response.headers["x-custom-header"]).to.eq('added by cy.intercept')
          expect(res.request.headers).to.have.property("x-custom-header", 'added by cy.intercept')
          expect(res.response.body[0].name).to.eq("Carlos Ruiz Mock")
        })
      })
  })

