import axios from 'axios'


export const GET_TRANSACTION_HISTORY = 'GET_TRANSACTION_HISTORY'
export const getTransactionHistory = () => {
	return function(dispatch) {
        const host = process.env.NODE_ENV === 'production' ? 'https://damp-crag-93133.herokuapp.com/' : 'http://localhost:3000'
        axios.get(`${host}/transactionHistory`)
      	.then(function(res) {
            dispatch({
        		type: GET_TRANSACTION_HISTORY,
        		payload: res.data.transactionHistory[0]
        	})
    	})
    	.catch((e) => {console.error('Error: ', e)})
	}
}

