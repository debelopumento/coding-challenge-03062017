const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const {PORT, DATABASE_URL} = require('./config');
console.log('DATABASE_URL: ', DATABASE_URL);
const {TransactionHistory} = require('./models');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('common'));
app.use(express.static('build'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

//get all transaction history
app.get('/transactionHistory', (req, res) => {
  TransactionHistory
    .find()
    .exec()
    .then(transactionHistory => {
      res.status(200).json({
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


//send PUT request when the user submit a transaction
app.put('/submitTransaction', (req, res) => {
    TransactionHistory
    .findById('58c86def734d1d635102a8c9')
    .exec()
    .then(transactionHistory => {

      let newTransaction = {
        time: Date(),
        type: req.body.type,
        amount: req.body.amount,
        description: req.body.description,
      }

      if (newTransaction.type === 'deposit') {
        let delay = 3
        let later = new Date()
        later.setMinutes(later.getMinutes() + delay)
        newTransaction.pendingClearTime = later
        newTransaction.balance = transactionHistory.currentBalance + newTransaction.amount
        transactionHistory.currentBalance = transactionHistory.currentBalance + newTransaction.amount
        
        transactionHistory.pendingTransactions.unshift(newTransaction)
      }
      if (newTransaction.type === 'withdraw') {
        let delay = 2
        let later = new Date()
        later.setMinutes(later.getMinutes() + delay)
        newTransaction.pendingClearTime = later
        newTransaction.balance = transactionHistory.currentBalance - newTransaction.amount
        transactionHistory.currentBalance = transactionHistory.currentBalance - newTransaction.amount
        transactionHistory.pendingTransactions.unshift(newTransaction)
      }
      if (newTransaction.type === 'winFromTicket') {
        newTransaction.balance = transactionHistory.currentBalance + newTransaction.amount
        transactionHistory.currentBalance = transactionHistory.currentBalance + newTransaction.amount
        transactionHistory.transactions.unshift(newTransaction)
        transactionHistory.availableBalance = transactionHistory.availableBalance + newTransaction.amount
      }
      
      TransactionHistory
        .findByIdAndUpdate('58c86def734d1d635102a8c9', transactionHistory)
        .exec()
        .then(function() {
          console.log(404)
          res.status(201).json({message: 'Transaction submitted!', transactionHistory})
        })
        .catch(
          err => {
            console.error(err);
            res.status(500).json({message: 'Internal server error'});
        })
      
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    })

})

//go through all pending transactions once a second and clear the valid ones
const clearTransactions = () => {
  TransactionHistory
  .findById('58c86def734d1d635102a8c9')
  .exec()
  .then(currentTransactionHistory => {
    let newPendingTransactions = []
    currentTransactionHistory.pendingTransactions.forEach(function(transaction) {
      const now = new Date()
      if (transaction.pendingClearTime <= now) {
        //clear this transaction
        currentTransactionHistory.transactions.unshift(transaction)
        if(transaction.type === 'deposit') {
          currentTransactionHistory.availableBalance = currentTransactionHistory.availableBalance + transaction.amount
        }
        if (transaction.type === 'withdraw') {
          currentTransactionHistory.availableBalance = currentTransactionHistory.availableBalance - transaction.amount
        }
      } else {
        newPendingTransactions.push(transaction)
      }
    })
    currentTransactionHistory.pendingTransactions = newPendingTransactions
    TransactionHistory
    .findByIdAndUpdate('58c86def734d1d635102a8c9', currentTransactionHistory)
    .exec()
    .catch(
      err => {
        console.error(err);
    })
  })
  .catch(
    err => {
      console.error(err);
  })
}

setInterval(clearTransactions, 1000)


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
