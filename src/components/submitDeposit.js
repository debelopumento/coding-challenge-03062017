import React, { Component } from 'react'
import axios from 'axios'

class SubmitDeposit extends Component {
  	
	constructor() {
		super()
		this.state = {
			depositAmount: 0
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		const depositAmount = event.target.value
		this.state.depositAmount = depositAmount
		console.log(7, depositAmount)
	}

	handleSubmit(event) {
		event.preventDefault()
		console.log('submitted', this.state.depositAmount)
		this.refs.numberInput.value=''
		const newTransaction = {
			type: 'deposit',
			amount: Number(this.state.depositAmount),
			description: 'BofA Core Checking - XXXX'
		}
		const requestURL = 'http://localhost:8080/submitTransaction'
		console.log(16, newTransaction)
		axios.put(requestURL, newTransaction)
      	.then(function(res) {
        	console.log(15, res)
            
    	})
    	.catch((e) => {console.error('Error: ', e)})
	}

    render() {
      return (
        <div>
      	  <p>Deposit (Clears in 3 minutes):</p>
      	  <input placeholder='0.00' ref='numberInput' onChange={this.handleChange} type='number' />
      	  <input value='Submit' type='submit' onClick={this.handleSubmit} />
        </div>
      );
    }
}

export default SubmitDeposit;
