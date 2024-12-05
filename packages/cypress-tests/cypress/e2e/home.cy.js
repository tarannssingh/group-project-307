// https://learn.cypress.io/testing-your-first-application/installing-cypress-and-writing-your-first-test

const speakeasy = require("speakeasy");

describe("home page", () => {
  beforeEach("logs in to application", () => {
    const totp_gen_code = "JRJF24KUNFFXWL3VJ5EDCKKIMJJCMYLJ"
    // const token = speakeasy.totp({
    //   secret: totp_gen_code,
    //   encoding: 'base32'
    // })
    cy.visit("/login");
    cy.get("h2").contains("Login to PiggyPass");
    cy.get(".username").type("test@example.com")
    cy.get(".password").type("P4ssw0@D3211!E")
    cy.task("generateOTP", totp_gen_code).then((token) => {
      cy.get(".2FA").type(token);
      cy.get(".auth-button").click()
    });
  });

  const website = "https://www.apple.com"
  let username = "at" + (new Date()).getTime()
  const password = 'e'
  
  it("creates a new credential, searches for it by username, updates it, then searches for it again by website, then deletes it", () => {
    cy.get('.flex').click()
    cy.get(".website").type(website)
    cy.get(".username").type(username)
    cy.get(".password").type(password)
    cy.get(".bg-red-600").click()

    cy.get('.form-select').select("Username")
    cy.get('.m-0').type(username)
    cy.get('.bg-white').click()
    cy.get(':nth-child(3) > .rounded-lg > .flex').click()
    cy.get('.bg-green-400').click()
    username += "ee8898988989"
    cy.get(".username").clear().type(username)
    cy.get('.bg-yellow-400').click()

    cy.get('.form-select').select("Website")
    cy.get('.m-0').clear().type(website)
    cy.get('.bg-white').click()
    cy.get(':nth-child(3) > .rounded-lg > .flex').click()
    cy.get('.bg-red-400').click()
    cy.get('.bg-yellow-400').click()
  })

});

