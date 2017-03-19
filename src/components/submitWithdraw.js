import React, { Component } from 'react'
import axios from 'axios'
import styles from './componentCSS'

class SubmitWithdraw extends Component {
  	
	constructor() {
		super()
		this.state = {
			withdrawAmount: 0
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		const withdrawAmount = event.target.value
		this.state.withdrawAmount = withdrawAmount
		console.log(7, withdrawAmount)
	}

	handleSubmit(event) {
		console.log('submitted', this.state.withdrawAmount)
		this.refs.numberInput.value=''
		const newTransaction = {
			type: 'withdraw',
			amount: Number(this.state.withdrawAmount),
			description: 'BofA Core Checking - XXXX'
		}
		const requestURL = '/submitTransaction'
		console.log(16, newTransaction)
		axios.put(requestURL, newTransaction)
      	.then(function(res) {
        	console.log(15, res)
            
    	})
    	.catch((e) => {console.error('Error: ', e)})
	}

    render() {
      return (
        <div style={ styles.inputContainer }>
      	  <p style={ styles.inputContainerText }>Withdraw (Clears in 2 minutes):</p>
      	  <input style={ styles.inputBox} placeholder='0.00' ref='numberInput' onChange={this.handleChange} type='number' />
      	  <input style={ styles.submitButton} value='Submit' type='submit' onClick={this.handleSubmit} />
        </div>
      );
    }
}

export default SubmitWithdraw
