import {combineReducers} from 'redux'

const TransactionHistoryReducer = (state=null, action) => {
	switch (action.type) {
		case "GET_TRANSACTION_HISTORY": {
			return action.payload
		}
		case "SUBMIT_TRANSACTION": {
			console.log(45)
			return state
			
		}
	}

	return state
}

const allReducers = combineReducers({
	transactionHistory: TransactionHistoryReducer
})

export default allReducers

