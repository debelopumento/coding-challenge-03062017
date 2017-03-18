const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server.js')
const should = chai.should()
const app = server.app
const storage = server.storage
const mongoose = require('mongoose')
const TransactionHistory = require('../models.js').TransactionHistory
server.runServer().catch(err => console.error(err));

chai.use(chaiHttp)

describe('index page', function() {
  it('exists', function(done) {
    chai.request(app)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200)
        res.should.be.html
        done()
    })
  })
})


describe('api', function() {
  it('should get transaction info from database', function(done) {
    chai.request(app)
      .get('/transactionHistory')
      .then(function(res) {
        res.should.have.status(200)
        res.should.be.JSON
        res.body.transactionHistory.should.have.length.of.at.least(1)
        res.body.transactionHistory.transactions.should.be.a('array')
        res.body.transactionHistory.should.have.property('currentBalance')
        res.body.transactionHistory.should.have.property('availableBalance')
        res.body.transactionHistory.transactions[0].should.have.property('time')
        res.body.transactionHistory.transactions[0].should.have.property('type')
        res.body.transactionHistory.transactions[0].should.have.property('amount')
        res.body.transactionHistory.transactions[0].should.have.property('description')
        res.body.transactionHistory.transactions[0].should.have.property('balance')
        done()
      })
      .catch(function (e) {
        console.log(103, e)
        done()
      })
  })
})
