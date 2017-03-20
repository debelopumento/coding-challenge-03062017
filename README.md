# Long Game Programming Challenge  [![Build Status](https://travis-ci.org/debelopumento/long-game-challenge.svg?branch=master)](https://travis-ci.org/debelopumento/long-game-challenge)
(Continuous Integration on Travis CI was disabled after the repo was set to private)

This is my solution to Long Game's Programming challenge. I built the client side with React and the server side with Node.

It is deployed on Heroku at: [https://damp-crag-93133.herokuapp.com/](https://damp-crag-93133.herokuapp.com/)

### Run code locally
```sh
npm install
npm start
```
Then open [http://localhost:8080/](http://localhost:8080/)


### Server Side Development
- The server is written with Node and Express.
- MongoDB and Mongoose was used for database.
- In this challenge there is only one user in the database so its user ID is hard coded in the PUT request when updating the transaction list.
- When a deposit or a withdraw is submited, the transaction is stored in an array with the time that it is supposed to be cleared. There is another function "clearTransactions" on the server that goes through all the pending transactions and clear the ones that have reached their transaction-clear-time.


### Client Side Development
- The client side was devleoped with React and Redux.
- When the page loads, this user's transaction information is loaded and saved in store.
- In ./src/components/transactions.js, the page is set to refresh once every second on line 65 so the user does not get a delayed display of if the transaction is cleared or still pending. It can be set to refresh once every 10 seconds and the user might see a delay of displaying pending transactions getting cleared for up to 10 seconds.


### Unit Test
To run unit test
```sh
npm test
```
