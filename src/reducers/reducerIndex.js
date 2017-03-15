import React from 'react'
import {combineReducers} from 'redux'
import store from '../store'

import axios from 'axios'

const CurrentBalanceReducer = (state=200, action) => {
	
	

	return state
}

const TransactionHistoryReducer = (state=null, action) => {
	switch (action.type) {
		case "GET_TRANSACTION_HISTORY": {
			return action.payload
		}
	}

	return state
}


const allReducers = combineReducers({
	currentBalance: CurrentBalanceReducer,
	transactionHistory: TransactionHistoryReducer
})

export default allReducers

