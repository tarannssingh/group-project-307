// https://learn.cypress.io/testing-your-first-application/installing-cypress-and-writing-your-first-test

const speakeasy = require("speakeasy");

describe("home page", () => {
  beforeEach("there is something being rendered", () => {
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
  
  it("creates a new credential, searches it, and then deletes it", () => {
    const username = "at" + (new Date()).getTime()
    const password = 'e'
    const website = "https://apple.com"
    cy.get('.flex').click()
    cy.get(".website").type(website)
    cy.get(".username").type(username)
    cy.get(".password").type(password)
    cy.get(".bg-red-600").click()

  })
});

