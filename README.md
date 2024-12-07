# group-project-307

# Project Blurb (Vision)

PiggyPass is a password manager for internet users who struggle to remember passwords or don’t want to risk their accounts getting attacked.
<br /><br />
PiggyPass securely keeps track of username and passwords with 2 factor authentication, database password encryption, and a secure user interface. It offers a centralized location to store passwords and an easy way to search through them. Users has options to generate a secure password that meet standard password requirements and substitute inputted passwords to produce a more secure password. Users are able view parts of their passwords to access their password securely in public or view passwords in their entirety.
Using Bootstrap we created dialog popups allowing for components to accept and display new information for the user. Using Cypress, we can implement tests for the project through running the website directly allowing for more direct debugging.

# Deployed Application
[Link to app](https://delightful-dune-019b8a21e.5.azurestaticapps.net/)

# User Stories

[https://docs.google.com/document/d/1mTgCzb-miKglkNFTxlXBUtG3lIcP98tZp6LwHdCo6i4/edit?tab=t.0](https://docs.google.com/document/d/1mTgCzb-miKglkNFTxlXBUtG3lIcP98tZp6LwHdCo6i4/edit?tab=t.0)

# UI Prototype and Storyboard

[https://www.figma.com/design/RbxqUP7Gn4Vnx9Q0g6gk2J/307-Group-Project] (https://www.figma.com/design/RbxqUP7Gn4Vnx9Q0g6gk2J/307-Group-Project)

# Diagrams

[Check out our Class Diagram](docs/diagram.md)

# Demo Video
[Click to view the demo](https://youtu.be/n11NRBtlf3g)

# Final Presentation

[https://docs.google.com/presentation/d/1BHITpHPAKnQ0XUZIlyZafL2kal9cnHxQ1WGuUK5OQSk/edit#slide=id.g31c5eb6deea_3_0](https://docs.google.com/presentation/d/1BHITpHPAKnQ0XUZIlyZafL2kal9cnHxQ1WGuUK5OQSk/edit#slide=id.g31c5eb6deea_3_0)

# Github Issues and Sprint Boards

[https://github.com/users/tarannssingh/projects/1/views/1?filterQuery=](https://github.com/users/tarannssingh/projects/1/views/1?filterQuery=)
[https://github.com/tarannssingh/group-project-307/issues](https://github.com/tarannssingh/group-project-307/issues)

# Documentation

# Contributing

We are following [Airbnb Eslint Config](https://www.npmjs.com/package/eslint-config-airbnb)
<br />
We are using [Prettier](https://prettier.io/)

# Development Environment Set Up

1. Clone project from git
2. [Install Node.js and npm](https://nodejs.org/en/download/) if you haven't already
3. Run `npm install` in root to install all dependencies
4. Install [Prettier](https://prettier.io/docs/en/install) using `npm install --save-dev --save-exact prettier`
5. Create necessary .env files in the express-backend and react-frontend. Get the secrets from a current developer.
6. To run the backend from the root go to `packages/express-backend` and run `npx nodemon backend.js`
7. To run the frontend, from the root go to `packages/react-frontend` and run `npm run dev`. The backend must be running for the frontend to work correctly.
8. To run Prettier run `npx prettier . --write` in either the root file, express-backend, or react-frontend to edit all files

# Testing

We are using Cypress E2E testing.
