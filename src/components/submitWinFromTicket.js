import React, { Component } from 'react'
import axios from 'axios'

class SubmitWinFromTicket extends Component {
  	
	constructor() {
		super()
		this.state = {
			winAmount: 0
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		const winAmount = event.target.value
		this.state.winAmount = winAmount
		console.log(7, winAmount)
	}

	handleSubmit(event) {
		console.log('submitted', this.state.winAmount)
		this.refs.numberInput.value=''
		const ticketNumber = Math.floor(10000000 + Math.random() * 90000000)
		const newTransaction = {
			type: 'winFromTicket',
			amount: Number(this.state.winAmount),
			description: `Ticket #{ticketNumber}`
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
      	  <p>Win from ticket (Clears instantly):</p>
      	  <input placeholder='0.00' ref='numberInput' onChange={this.handleChange} type='number' />
      	  <input type='submit' onClick={this.handleSubmit} />
        </div>
      );
    }
}

export default SubmitWinFromTicket;
