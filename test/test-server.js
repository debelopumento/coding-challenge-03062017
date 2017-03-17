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

/*
describe('api', function() {
  it('should get transaction info from database', function(done) {
    this.timeout(5000)
    setTimeout(done, 5000)
    chai.request(app)
      .get('/transactionHistory')
      
      .then(function(res) {
        console.log(101)
        res.should.have.status(200)
        //res.should.be.JSON
        //res.body.transactionHistory.should.have.length.of.at.least(1)
        done()
      })
      
      //.then(done, done)
      .catch(function (e) {
        console.log(103, e)
        done()
      })

      
  })
})
*/

	
