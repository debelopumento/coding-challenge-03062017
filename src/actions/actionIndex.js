import axios from 'axios'




export const GET_TRANSACTION_HISTORY = 'GET_TRANSACTION_HISTORY'
export const getTrasactionHistory = () => {
	return function(dispatch) {
		console.log(7)
        axios.get('http://localhost:8080/transactionHistory')
      	.then(function(res) {
        	console.log(15, res)
            dispatch({
        		type: GET_TRANSACTION_HISTORY,
        		payload: res
        	})
    	})
    	.catch((e) => {console.error('Error: ', e)})

	}
}

