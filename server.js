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
        time: Date(),
        type: req.body.type,
        amount: req.body.amount,
        description: req.body.description,
      }
      let delay = 0
      if (newTransaction.type === 'deposit') {
        delay = 3
        console.log(904, newTransaction.type)
        newTransaction.balance = transactionHistory.currentBalance + newTransaction.amount
        transactionHistory.currentBalance = transactionHistory.currentBalance + newTransaction.amount
      }
      if (newTransaction.type === 'withdraw') {
        console.log(905)
        delay = 2
        newTransaction.balance = transactionHistory.currentBalance - newTransaction.amount
        transactionHistory.currentBalance = transactionHistory.currentBalance - newTransaction.amount
      }
      if (newTransaction.type === 'winFromTicket') {
        console.log(906)
        delay = 0
        newTransaction.balance = transactionHistory.currentBalance + newTransaction.amount
        transactionHistory.currentBalance = transactionHistory.currentBalance + newTransaction.amount
      }

      let later = new Date()
      later.setMinutes(later.getMinutes() + delay)
      console.log(901.5, later)
      newTransaction.pendingClearTime = later
      
      console.log(902, newTransaction)
      
      transactionHistory.pendingTransactions.push(newTransaction)
      console.log(903, transactionHistory.transactions, 908, transactionHistory.pendingTransactions)

      TransactionHistory
        .findByIdAndUpdate('58c86def734d1d635102a8c9', transactionHistory)
        .exec()
        .then(function() {
          res.status(204).json({message: 'Transaction submitted!'})
          
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
  console.log(899)
  TransactionHistory
  .findById('58c86def734d1d635102a8c9')
  .exec()
  .then(currentTransactionHistory => {
    console.log(803, currentTransactionHistory.pendingTransactions)
    let newPendingTransactions = []
    currentTransactionHistory.pendingTransactions.forEach(function(transaction) {
      console.log(801, transaction)
      const now = new Date()
      if (transaction.pendingClearTime <= now) {
        console.log(821)
        //clear this transaction
        currentTransactionHistory.transactions.unshift(transaction)
        if(transaction.type === 'deposit' || transaction.type === 'winFromTicket') {
          console.log(907)
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
    .then(res.status(204).json({message: 'Pending transactions checked!'}))
    .catch(function(e) {
      res.status(500).end()
    })

  })
  .catch(function(e) {
    res.status(500).end()
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
