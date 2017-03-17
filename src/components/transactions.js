import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import store from '../store'
import axios from 'axios'
import Time from './time'
import * as actions from '../actions/actionIndex'


const Transaction = (props) => {
	console.log(24, props.date)
	return (
		<div>
			<div>
				<span>{props.date}</span>
				$<span>{props.amount}</span>
				<span>{props.type}</span>
				<span>{props.pending}</span>
				$<span>{props.balance}</span>
			</div>
			<div>
				<span>{props.time}</span>
				<span>{props.description}</span>
			</div>
		</div>
	)
}

const TransactionList = (props) => {


	const formatDate = (time) => {
		const date = new Date(time)
		const formatedDate = (date.getMonth() + 1).toString() + '/' + (date.getDate() + 1).toString() + '/' + date.getFullYear().toString()
		return formatedDate
	}
	const formatTime = (time) => {
		const date = new Date(time)
		const rawHour = date.getHours()
		const ampm = rawHour < 12 ? 'AM' : 'PM'
		const hour = rawHour > 12 ? rawHour - 12 : rawHour == 0 ? 12 : rawHour
		const minute = date.toString().slice(19, 21)
		const second = date.toString().slice(22, 24)
		const formatedTime = hour + ':' + minute + ':' + second + ampm
		return formatedTime
	}
	let i = 0 
	const pendingTransactions = props.data.pendingTransactions.map(function(transaction) {
		if (i <= 9) {
			i++
			const transactionDate = formatDate(transaction.time)
			const transactionTime = formatTime(transaction.time)
			
			return <Transaction key={i} date={transactionDate} amount={transaction.amount} type={transaction.type} pending='(pending)' balance={transaction.balance}  time={transactionTime} description={transaction.description} />
		}
	})
	const clearedTransactions = props.data.transactions.map(function(transaction) {
		if (i <= 9) {	
			i++
			const transactionDate = formatDate(transaction.time)
			const transactionTime = formatTime(transaction.time)
			return <Transaction key={i} date={transactionDate} amount={transaction.amount} type={transaction.type} pending='' balance={transaction.balance}  time={transactionTime} description={transaction.description} />
		}
	})
	return (
		<div>
			{pendingTransactions}
			{clearedTransactions}
			
		</div>
	)
}


const { object, func} = PropTypes
class TransactionInfo extends PureComponent {
	
	static PropTypes = {
		data: object,
		load: func
	}

	static defaultProps = {
		data: {}
	}

	componentWillMount() {
		this.props.load()
	}

	componentDidMount() {
		this.interval = setInterval(()=>{this.props.load()}, 10000)
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	render() {
		console.log(2, this.props.data)

		if(this.props.data != null) {
			
			return (
				<div>
					<div>My Savings History as of <Time /></div>
					<div>Current Balance: {this.props.data.currentBalance} (${this.props.data.availableBalance} Available)</div>
					<div><span>Recent Activity</span><span>Balance</span></div>
					<TransactionList data={this.props.data}/>
				</div>
			)} else {
				return <div>My Savings History as of <Time /></div>
		}
	}
}

export default connect(
	storeState => ({
		data: storeState.transactionHistory,
	}),
	{
		load: actions.getTransactionHistory,
	}
)(TransactionInfo) 