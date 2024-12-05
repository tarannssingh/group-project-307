const { defineConfig } = require("cypress");
const otplib = require("otplib");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://delightful-dune-019b8a21e.5.azurestaticapps.net/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        generateOTP(secret) {
          require("cypress-otp");
          return otplib.authenticator.generate(secret);
        },
      });
    },
  },
});



