const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');

require('dotenv').config();

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');
console.log('DATABASE_URL: ', DATABASE_URL);
const {TransactionHistory} = require('./models');
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(morgan('common'));
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/transactionHistory', (req, res) => {
  TransactionHistory
    .find()
    .exec()
    .then(transactionHistory => {
      res.json({
        transactionHistory: transactionHistory.map(
          transactionHistory => transactionHistory.apiRepr())
      });
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});

/*
currentBalance: {type: Number, required: true},
  availableBalance: {type: Number, required: true},
  transactions: [{
      time: {type: Date, required: true},
      type: {type: String, required: true},
      amount: {type: Number, required: true},
      description: {type: String, required: true},
      pending: {type: Boolean, required: true},
      balance: {type: Number, required: true},
    }]
*/


app.put('/submitTransaction', (req, res) => {
  
    console.log(900, req.body)

    TransactionHistory
    .findById('58c86def734d1d635102a8c9')
    .exec()
    .then(transactionHistory => {
      console.log(901, transactionHistory)
      let newTransaction = {
        time: new Date(),
        type: req.body.type,
        amount: req.body.amount,
        description: req.body.description,
        pending: true
      }
      if (newTransaction.type === 'deposit' || newTransaction.type === 'winFromTicket') {
        newTransaction.balance = transactionHistory.currentBalance + newTransaction.amount
      } else if (newTransaction.type === 'withdraw') {
        newTransaction.balance = transactionHistory.currentBalance - newTransaction.amount
      }
      console.log(902, newTransaction)
      transactionHistory.transactions.push(newTransaction)
      console.log(903, transactionHistory)

      function clearTransaction() {
        newTransaction.pending = false
        TransactionHistory
        .findById('58c86def734d1d635102a8c9')
        .exec()
        .then(currentTransactionHistory => {
          if(newTransaction.type === 'deposit' || newTransaction.type === 'winFromTicket') {
            currentTransactionHistory.currentBalance = currentTransactionHistory.currentBalance + newTransaction.amount
          }
          if (newTransaction.type === 'withdraw') {
            currentTransactionHistory.currentBalance = currentTransactionHistory.currentBalance - newTransaction.amount
          }
          currentTransactionHistory.transactions = transactionHistory.transactions
          TransactionHistory
          .findByIdAndUpdate('58c86def734d1d635102a8c9', currentTransactionHistory)
          .exec()
          .then(res.status(204).json({message: 'Transaction cleared!'}).end())
          .catch()

        })
        .then(res.status(204).end())
        .catch()

      }

      if (newTransaction.type === 'deposit') {
        console.log(904, newTransaction.type)
        setTimeout(clearTransaction, 30)
      }
      if (newTransaction.type === 'withdraw') {
        console.log(905)
        setTimeout(clearTransaction, 20)
      }
      if (newTransaction.type === 'winFromTicket') {
        console.log(906)
        clearTransaction()
      }
    })
    .then(res.status(204).end())
    .catch()

})


app.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found'});
});

let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};
