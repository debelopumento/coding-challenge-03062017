import React, { Component } from 'react'
import axios from 'axios'
import reactCSS from 'reactcss'
import styles from './componentCSS'
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
        	console.log(15, res.data)
    	})
    	.catch((e) => {console.error('Error: ', e)})
	}

    render() {
      
      return (
        <div style={ styles.inputContainer }>
      	  <p style={ styles.inputContainerText }>Deposit (Clears in 3 minutes):</p>
      	  <input style={ styles.inputBox} placeholder='0.00' ref='numberInput' onChange={this.handleChange} type='number' />
      	  <input style={ styles.submitButton} type='submit' onClick={this.handleSubmit} />
        </div>
      );
    }
}

export default SubmitDeposit;
