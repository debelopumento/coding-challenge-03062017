import React from 'react'
import Transaction from './transaction'
import reactCSS from 'reactcss'

const styles = reactCSS({
	'default': {
		transactionContainer: { 
		    display: 'block',
		    marginTop: '40px',
		    height: '530px',
		    overflow: 'auto',
		}
	}
})

const TransactionList = (props) => {
	const formatDate = (time) => {
		const date = new Date(time)
		console.log(12, date)
		const formatedDate = (date.getMonth() + 1).toString() + '/' + (date.getDate() + 1).toString() + '/' + date.getFullYear().toString().slice(2,5)
		return formatedDate
	}
	const formatTime = (time) => {
		const date = new Date(time)
		const rawHour = date.getHours()
		const ampm = rawHour < 12 ? 'AM' : 'PM'
		const hour = rawHour > 12 ? rawHour - 12 : rawHour === 0 ? 12 : rawHour
		const minute = date.toString().slice(19, 21)
		const second = date.toString().slice(22, 24)
		const formatedTime = hour + ':' + minute + ':' + second + ampm
		return formatedTime
	}
	const formatTransactionType = (transactionType) => {
		if (transactionType === 'winFromTicket') {
			const transactionTypeDisplay = 'won playing ticket'
			return transactionTypeDisplay
		} else return transactionType
	}
	let length = props.length
	let index = 0
	const pendingTransactions = props.data.pendingTransactions.map(function(transaction) {
		if (index <= length) {
			index++
			const transactionDate = formatDate(transaction.time)
			const transactionTime = formatTime(transaction.time)
			const transactionTypeDisplay = formatTransactionType(transaction.type)
			return <Transaction key={index} date={transactionDate} amount={transaction.amount} type={transactionTypeDisplay} pending='(pending)' balance={transaction.balance}  time={transactionTime} description={transaction.description} />
		}
	})
	const clearedTransactions = props.data.transactions.map(function(transaction) {
		if (index <= length) {	
			index++
			const transactionDate = formatDate(transaction.time)
			const transactionTime = formatTime(transaction.time)
			const transactionTypeDisplay = formatTransactionType(transaction.type)
			return <Transaction key={index} date={transactionDate} amount={transaction.amount} type={transactionTypeDisplay} pending='' balance={transaction.balance}  time={transactionTime} description={transaction.description} />
		}
	})

	return (
		<div style={ styles.transactionContainer }>
			{pendingTransactions}
			{clearedTransactions}
		</div>
	)
}

export default TransactionList