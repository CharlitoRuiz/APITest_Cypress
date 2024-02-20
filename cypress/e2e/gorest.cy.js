/// <reference types="cypress"/>
import data from '../fixtures/data.json';
let idUser
describe('API Testing', () => {
  it('Get users', () => {
    cy.RequestAPI('GET','/users').then((response)=>{
      console.log(response)
      cy.ValidateCode(response, 200)
      expect(response.allRequestResponses[0]["Response Headers"]["content-type"]).to.eq("application/json; charset=utf-8")
      expect(response).to.have.property('duration')

    })
  })
  it('Get posts', () => {
    cy.RequestAPI('GET', '/posts').then((response)=>{
      cy.ValidateCode(response, 200)
      expect(response.allRequestResponses[0]["Response Headers"]["content-type"]).to.eq("application/json; charset=utf-8")
      expect(response).to.have.property('duration')

    })
  })
  it('Create user', () => {
    cy.RequestAPI('POST','/users',0,
      {
        "name": data.Create.name,
        "email": data.Create.email,
        "gender": data.Create.gender,
        "status": data.Create.status
      }
    ).then((response)=>{
      idUser = response.body.id
      cy.ValidateCode(response, 201)
    })
  })
  it('Update user', () => {
    cy.RequestAPI('PUT','/users',idUser,
    {
      "email": data.Update.email 
    }).then((response)=>{
      cy.ValidateCode(response, 200)
    })
  })
  it('Delete user', () => {
    cy.RequestAPI('DELETE','/users', idUser).then((response)=>{
      cy.ValidateCode(response, 204)
    })
  })
})