# group-project-307

# Contributing
We are following Airbnb Eslint Config
<br />
https://www.npmjs.com/package/eslint-config-airbnb 

# Project Blurb
PiggyPass is a password manager for internet users who struggle to remember passwords or don’t want to risk their accounts getting attacked. 
<br /><br />
PiggyPass securely keeps track of username and passwords with 2 factor authentication, database password encryption, and a secure user interface. It offers a centralized location to store passwords and an easy way to search through them. Users has options to generate a secure password that meet standard password requirements and substitute inputted passwords to produce a more secure password. Users are able view parts of their passwords to access their password securely in public or view passwords in their entirety.
Using Bootstrap we created dialog popups allowing for components to accept and display new information for the user. Using Cypress, we can implement tests for the project through running the website directly allowing for more direct debugging.

# Development Environment Set Up
1. Clone project from git
2. Run 'npm install' in root 
3. Create necessary .env files in the express-backend and react-frontend
4. To run the backend from the root go to ```packages/express-backend``` and run ```npx nodemon backend.js```
5. To run the frontend, from the root go to ```packages/react-frontend``` and run ```npm run dev```. The backend must be running for the frontend to work correctly.

# Diagrams
[Check out our Class Diagram](docs/diagram.md)
