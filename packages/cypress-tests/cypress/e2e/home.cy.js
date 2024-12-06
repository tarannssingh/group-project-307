// https://learn.cypress.io/testing-your-first-application/installing-cypress-and-writing-your-first-test

const speakeasy = require("speakeasy");

describe("home page", () => {
  beforeEach("logs in to application", () => {
    const totp_gen_code = "JRJF24KUNFFXWL3VJ5EDCKKIMJJCMYLJ";
    // const token = speakeasy.totp({
    //   secret: totp_gen_code,
    //   encoding: 'base32'
    // })
    cy.visit("/");
    cy.get("h2").contains("Login to PiggyPass");
    cy.get(".username").type("test@example.com");
    cy.get(".password").type("P4ssw0@D3211!E");
    cy.task("generateOTP", totp_gen_code).then((token) => {
      cy.get(".2FA").type(token);
      cy.get(".auth-button").click();
    });
    cy.url().should(
      "eq",
      "https://delightful-dune-019b8a21e.5.azurestaticapps.net/",
    ); // vertification that the user has logged in
  });

  const website = "https://www.apple.com";
  let username = "at" + new Date().getTime();
  const password = "e";

  it("creates a new credential, searches for it by username, updates it, then searches for it again by website, then deletes it. Then logs out and signs up with new credentaials", () => {
    // create, the ability to click on the credential is vertification that it was created
    cy.get(".flex").click();
    cy.get(".website").type(website);
    cy.get(".username").type(username);
    cy.get(".password").type(password);
    cy.get(".bg-red-600").click();

    // update and verify username was updated
    cy.get(".form-select").select("Username");
    cy.wait(100);
    cy.get(".m-0").type(username);
    cy.wait(100);
    cy.get(".bg-white").click();
    cy.wait(100);
    cy.get(":nth-child(2) > .m-1 > .flex").should("be.visible").click();
    cy.wait(100);
    cy.get(".bg-green-400").click();
    cy.wait(100);
    username += "ee8898988989";
    cy.get(".username").clear().type(username);
    cy.wait(100);
    cy.get(".bg-yellow-400").click();
    cy.wait(100);
    cy.get(".text-sm").should("contain.text", username);

    // delete the only credential and make sure there are no other credentials
    cy.get(".form-select").select("Website");
    cy.wait(100);
    cy.get(".m-0").clear().type("apple");
    cy.wait(100);
    cy.get(".bg-white").click();
    cy.wait(100);
    cy.get(":nth-child(2) > .m-1 > .flex").click();
    cy.wait(100);
    cy.get(".bg-red-400").click();
    cy.wait(100);
    cy.get(".bg-yellow-400").click();
    cy.wait(100);
    cy.get(".p-4 > p").should("contain.text", "No credentials available");

    // log out
    cy.get("img").click();
    cy.wait(100);
    cy.get(".dropdown-menu > :nth-child(1)").click();
    cy.wait(100);
    cy.get(".btn-primary").click();
    cy.wait(100);
    cy.url().should(
      "eq",
      "https://delightful-dune-019b8a21e.5.azurestaticapps.net/login",
    );

    // navigate signup
    cy.get(".auth-link").click();
    cy.url().should(
      "eq",
      "https://delightful-dune-019b8a21e.5.azurestaticapps.net/signup",
    );

    // new account was created
    cy.wait(100);
    cy.get("#email").type(username + "@gmail.com");
    cy.wait(100);
    cy.get("#password").type("P4ssw0@D3333!E");
    cy.wait(100);
    cy.get("#confirmPassword").type("P4ssw0@D3333!E");
    cy.wait(100);
    cy.get(".auth-button").click();
    cy.wait(400);
    cy.get(".auth-message").should(
      "contain.text",
      "Signup successful for user",
    );
  });
});
