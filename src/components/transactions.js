import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import store from '../store'
import axios from 'axios'
import Time from './time'
import * as actions from '../actions/actionIndex'
//import { getTransactionHistory } from '../actions/actionIndex'

const { object, func} = PropTypes
/*
@connect(
	storeState => ({
		data: storeState.transactionHistory,
	}),
	{
		load: actions.getTransactionHistory,
	}
)

const DisplayedTransactions = connect(
	mapStateToProps,
	mapDispatchToProps
)(Transactions)


const mapStateToProps = (state) => {
	return {
		transactionHistory: state.transactionHistory
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({getTransactionHistory: getTransactionHistory}, dispatch)
}
*/
//const TransactionHistoryDisplay = connect(mapStateToProps, mapDispatchToProps)(Transactions)


class Transactions extends PureComponent {
	
	
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
	
	/*
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
	*/

	componentDidMount() {
		this.interval = setInterval(()=>{this.props.load()}, 20000)

	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}


	render() {
		console.log(1)
		console.log(2, this.props.data)
		if(this.props.data != null) {return (
			<div>
				<div>My Savings History as of <Time /></div>
				<div>{this.props.data.currentBalance}</div>
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
)(Transactions) 