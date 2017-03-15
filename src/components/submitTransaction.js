import React, { Component } from 'react'

class SubmitTransaction extends Component {
  	
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
		console.log('submitted', this.state.depositAmount)
	}

    render() {
      return (
        <div>
      	  <p>Deposit (Clears in 3 minutes):</p>
      	  <input placeholder='0.00' ref='numberInput' onChange={this.handleChange} type='number' />
      	  <input type='submit' onClick={this.handleSubmit} />
        </div>
      );
    }
}

export default SubmitTransaction;
