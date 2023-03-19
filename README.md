Introduction
The MVP wallet service is a NodeJS API that provides wallet functionality for the Demo Credit mobile lending app. The API provides endpoints for creating an account, funding an account, transferring funds to another user’s account, and withdrawing funds from an account. The API uses TypeScript and KnexJS ORM to interact with a MySQL database. This document provides information on how to set up and use the MVP wallet service.

Getting Started
To get started with the MVP wallet service, follow the steps below:

Clone the repository
Install dependencies by running npm install
Create a MySQL database and configure the database settings in the knexfile.ts file
Run the database migrations by running npm run migrate
Start the server by running npm start
API Endpoints
The MVP wallet service provides the following endpoints:

POST /accounts
This endpoint creates a new account for a user. It requires a user's name and email. A token is generated and returned as a response.

POST /fund
This endpoint allows a user to fund their account. It requires a user's token and the amount to be funded.

POST /transfer
This endpoint allows a user to transfer funds to another user's account. It requires a user's token, the recipient's email, and the amount to be transferred.

POST /withdraw
This endpoint allows a user to withdraw funds from their account. It requires a user's token and the amount to be withdrawn.

Token Authentication
The MVP wallet service uses token-based authentication. The token is generated when a user creates an account and is required for all other endpoints. The token must be included in the request headers as follows: Authorization: Bearer <token>.

Error Handling
The MVP wallet service provides error handling for common errors such as missing required parameters, invalid token, insufficient funds, and database errors. The API returns meaningful error messages in JSON format.

Unit Tests
The MVP wallet service includes unit tests to ensure that the API endpoints and database queries are working as expected. The tests can be run by running npm test.

Conclusion
The MVP wallet service provides wallet functionality for the Demo Credit mobile lending app. It allows users to create an account, fund their account, transfer funds to another user's account, and withdraw funds from their account. The API is secure and provides meaningful error messages. The MVP wallet service is built using NodeJS, TypeScript, KnexJS ORM, and MySQL database.