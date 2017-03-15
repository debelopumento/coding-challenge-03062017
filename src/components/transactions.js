import React, { Component } from 'react'
import store from '../store'
import axios from 'axios'
import Time from './time'
//import { getTransactionHistory } from '../actions/actionIndex'

const getTransactionHistory = () => {
	return function(dispatch) {
		console.log(7)
        axios.get('http://localhost:8080/transactionHistory')
      	.then(function(res) {
        	console.log(15, res)
            dispatch({
        		type: 'GET_TRANSACTION_HISTORY',
        		payload: res
        	})
    	})
    	.catch((e) => {console.error('Error: ', e)})

	}
}





class Transactions extends React.Component {
	
	constructor() {
		super()

		this.state = {
			transactionHistory: null
		}

		store.subscribe(() => {
			this.setState({
				transactionHistory: store.getState().transactionHistory
			})
		})
	}

	ComponentWillMount() {
		console.log(2)
		//store.dispatch(getTransactionHistory())
	}

	render() {
		console.log(1)
		
		return (
			<div>
				<p>My Savings History as of <Time /></p>
			</div>
		)
	}
}

export default Transactions