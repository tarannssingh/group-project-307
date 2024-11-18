// https://learn.cypress.io/testing-your-first-application/installing-cypress-and-writing-your-first-test

describe("home page", () => {
  it("there is something being rendered", () => {
    cy.visit("/");
    cy.get("h1").contains("Home Page Here!");
  });
});
