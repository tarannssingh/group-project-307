const { defineConfig } = require("cypress");
const otplib = require("otplib");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173/",
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



