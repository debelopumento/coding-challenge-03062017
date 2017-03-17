import axios from 'axios'




export const GET_TRANSACTION_HISTORY = 'GET_TRANSACTION_HISTORY'
export const getTransactionHistory = () => {
	return function(dispatch) {
		console.log(7)
        axios.get('/transactionHistory')
      	.then(function(res) {
        	console.log(15, res)
            dispatch({
        		type: GET_TRANSACTION_HISTORY,
        		payload: res.data.transactionHistory[0]
        	})
    	})
    	.catch((e) => {console.error('Error: ', e)})

	}
}

