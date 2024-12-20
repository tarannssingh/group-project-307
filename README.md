# group-project-307

# Project Blurb (Vision)

PiggyPass is a password manager for internet users who struggle to remember passwords or don’t want to risk their accounts getting attacked.
<br /><br />
PiggyPass securely keeps track of username and passwords with 2 factor authentication, database password encryption, and a secure user interface. It offers a centralized location to store passwords and an easy way to search through them. Users has options to generate a secure password that meet standard password requirements and substitute inputted passwords to produce a more secure password. Users are able view parts of their passwords to access their password securely in public or view passwords in their entirety.
Using Bootstrap we created dialog popups allowing for components to accept and display new information for the user. Using Cypress, we can implement tests for the project through running the website directly allowing for more direct debugging.

## Deployed Application
[Link to app](https://delightful-dune-019b8a21e.5.azurestaticapps.net/)
<br />
*See these [instructions](docs/instructions.md) on how to create an account and log in.

## User Stories

[Link to user stories](https://docs.google.com/document/d/1mTgCzb-miKglkNFTxlXBUtG3lIcP98tZp6LwHdCo6i4/edit?tab=t.0)

## UI Prototype and Storyboard

[See our Figma board](https://www.figma.com/design/RbxqUP7Gn4Vnx9Q0g6gk2J/307-Group-Project)

## Diagrams

[Check out our Class Diagram](docs/diagram.md)

## Demo Video
[Click to view the demo](https://youtu.be/n11NRBtlf3g)

## Final Presentation
[See our slides](https://docs.google.com/presentation/d/1BHITpHPAKnQ0XUZIlyZafL2kal9cnHxQ1WGuUK5OQSk/edit#slide=id.g31c5eb6deea_3_0)

## Github Issues and Sprint Boards

[Sprint 1 Project Board](https://github.com/users/tarannssingh/projects/1/views/1?filterQuery=) <br />
[Sprint 2 Project Board](https://github.com/users/tarannssingh/projects/1/views/2) <br />
[Sprint 3 Project Board](https://github.com/users/tarannssingh/projects/1/views/3) <br />
[Project issues](https://github.com/tarannssingh/group-project-307/issues)

# Documentation

## Contributing

We are following [Airbnb Eslint Config](https://www.npmjs.com/package/eslint-config-airbnb)
<br />
We are using [Prettier](https://prettier.io/)

## Development Environment Set Up

1. Clone project from git
2. [Install Node.js and npm](https://nodejs.org/en/download/) if you haven't already
3. Run `npm install` in root to install all dependencies
4. Install [Prettier](https://prettier.io/docs/en/install) using `npm install --save-dev --save-exact prettier`
5. Create necessary .env files in the express-backend and react-frontend. Get the secrets from a current developer.
6. To run the backend from the root go to `packages/express-backend` and run `npx nodemon backend.js`
7. To run the frontend, from the root go to `packages/react-frontend` and run `npm run dev`. The backend must be running for the frontend to work correctly.
8. To run Prettier run `npx prettier . --write` in either the root file, express-backend, or react-frontend to edit all files

## Testing

We are using Cypress E2E testing.

## Styling

We are using a combination of [React Bootstrap](https://react-bootstrap.netlify.app/) for our page styling and [shadcn/ui](https://ui.shadcn.com/) for components like our credential cards.


## Other Core Packages Used
1. speakeasy for our TOTP
2. jsonwebtoken for our JWT and User Auth
3. bcrypt for password encryption
4. omgopass for random password generation
5. express for backend
6. mongoose for mongodb communication
7. express-validator for sanitizing data sent to endpoints
8. bootstrap and tailwind for frontend styling
9. vite and react for frotend 

