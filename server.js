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
        transactionHistory.currentBalance = transactionHistory.currentBalance + newTransaction.amount
      } else if (newTransaction.type === 'withdraw') {
        newTransaction.balance = transactionHistory.currentBalance - newTransaction.amount
        transactionHistory.currentBalance = transactionHistory.currentBalance - newTransaction.amount
      }
      console.log(902, newTransaction)
      transactionHistory.transactions.unshift(newTransaction)
      console.log(903, transactionHistory)

      TransactionHistory
        .findByIdAndUpdate('58c86def734d1d635102a8c9', transactionHistory)
        .exec()
        .then(function() {
          function clearTransaction() {
            
            TransactionHistory
            .findById('58c86def734d1d635102a8c9')
            .exec()
            .then(currentTransactionHistory => {
              if(newTransaction.type === 'deposit' || newTransaction.type === 'winFromTicket') {
                console.log(907)
                currentTransactionHistory.availableBalance = currentTransactionHistory.availableBalance + newTransaction.amount
                newTransaction.pending = false
              }
              if (newTransaction.type === 'withdraw') {
                currentTransactionHistory.availableBalance = currentTransactionHistory.availableBalance - newTransaction.amount
                newTransaction.pending = false
              }
              currentTransactionHistory.transactions = transactionHistory.transactions.slice(0, (transactionHistory.transactions.length - 1))
              currentTransactionHistory.transactions.push(newTransaction)
              TransactionHistory
              .findByIdAndUpdate('58c86def734d1d635102a8c9', currentTransactionHistory)
              .exec()
              .then(res.status(204).json({message: 'Transaction cleared!'}))
              .catch(function(e) {
                res.status(500).end()
              })

            })
            .catch()

          }

          if (newTransaction.type === 'deposit') {
            console.log(904, newTransaction.type)
            setTimeout(clearTransaction, 5000)
          }
          if (newTransaction.type === 'withdraw') {
            console.log(905)
            setTimeout(clearTransaction, 5000)
          }
          if (newTransaction.type === 'winFromTicket') {
            console.log(906)
            clearTransaction()
          }
        })
        .catch()

      
    })
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
