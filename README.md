# Demo Credit MVP Wallet Service

The Demo Credit MVP wallet service is a NodeJS API that provides wallet functionality for the Demo Credit mobile lending app. The API provides endpoints for creating an account, funding an account, transferring funds to another user’s account, and withdrawing funds from an account. The API uses TypeScript and KnexJS ORM to interact with a MySQL database. This document provides information on how to set up and use the MVP wallet service.


## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn package manager (perferably yarn)
- Knex

### Installation

1. Clone the repository:
git clone https://github.com/valike23/demo_credit.git

2. Install dependencies by running 
yarn install
3. Run the database migrations by running npm run migrate 
yarn migration
4. Start the server by running
 yarn dev
### API Endpoints
The demo credit MVP wallet service provides the following endpoints:

POST /api/accounts/create-account
This endpoint creates a new account for a user. It requires a user's name and email and password. 

PUT /api/accounts/login
This endpoint creates a new session for the user. It requires an email and password. 

PUT /api/transactions/credit
This endpoint allows a user to fund their account. It requires a user's token and the amount to be funded.

POST /api/transactions/transfer
This endpoint allows a user to transfer funds to another user's account. It requires a user's token, the recipient's id, and the amount to be transferred.

POST /api/transactions/withdrawal
This endpoint allows a user to withdraw funds from their account. It requires a user's token and the amount to be withdrawn.
## Database Schema

![Database Schema](https://res.cloudinary.com/tjconnect/image/upload/v1679378878/lendsqr_avsrwk.png)


## Token Authentication
The Demo Credit MVP wallet service uses token-based authentication. The token is generated when a user creates an account and is required for all other endpoints. The token must be included in the request headers as follows: Authorization: Bearer <token>.

## Error Handling
The Demo Credit MVP wallet service provides error handling for common errors such as missing required parameters, invalid token, insufficient funds, and database errors. The API returns meaningful error messages in JSON format.

## Unit Tests
The Demo Credit MVP wallet service includes unit tests to ensure that the API endpoints and database queries are working as expected. The tests can be run by running 
# yarn test.

## Conclusion
The Demo Credit MVP wallet service provides wallet functionality for the Demo Credit mobile lending app. It allows users to create an account, fund their account, transfer funds to another user's account, and withdraw funds from their account. The API is secure and provides meaningful error messages. The Demo Credit MVP wallet service is built using NodeJS, TypeScript, KnexJS ORM, and MySQL database.