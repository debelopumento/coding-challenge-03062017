import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import Time from './time'
import * as actions from '../actions/actionIndex'
import TransactionList from './transactionList'
import reactCSS from 'reactcss'

const styles = reactCSS({
  'default': {
    title: { 
        display: 'inline-block',
        margin: '10px',
        fontSize: '23px',
        transform: 'scaleY(0.9)',
        fontWeight: 'bold',
    },
    balanceContainer: {
    	width: '370px',
    	margin: '0 auto',
    },

    balances: {
    	transform: 'scaleY(0.9)',
    	marginBottom: '10px',
    	fontSize: '17px',
    	fontWeight: 'bold',
    	color: '#555555'
    },
    currentBalance: {
    	transform: 'scaleY(0.8)',
    	fontSize: '25px',
    	fontWeight: '900',
    	color: '#555555'
    },
    availableBalance: {
    	fontWeight: '100',
    	fontSize: '16px',
    	color: '#666666'
    },
    left: {
    	float: 'left',
    	marginLeft: '12px',
    	marginTop: '13px',
    },
    right: {
    	float: 'right',
    	marginRight: '12px',
    	marginTop: '13px',
    }

  }
})
const { object, func} = PropTypes
class TransactionInfo extends PureComponent {
	
	static PropTypes = {
		data: object,
		load: func
	}

	static defaultProps = {
		data: {},
	}

	constructor() {
		super()
		this.state = {
			transactionListLength: 9
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentWillMount() {
		this.props.load()
	}

	componentDidMount() {
		this.interval = setInterval(()=>{this.props.load()}, 1000)
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	handleSubmit(event) {
		const totalTransactionCount = this.props.data.transactions.length + this.props.data.pendingTransactions.length
		if (this.state.transactionListLength < totalTransactionCount) {
			this.state.transactionListLength = this.state.transactionListLength + 10
		} else {
			alert('There are no more transactions.')
		}
	}

	render() {
		if(this.props.data != null) {
			return (
				<div className="TransactionInfo">
					<div style={ styles.title }><span>My Savings History as of </span><Time /></div>
					<div><span style={ styles.balances }>Current Balance: </span><span style={ styles.currentBalance }>${this.props.data.currentBalance} </span><span style={ styles.availableBalance }>(${this.props.data.availableBalance} Available)</span>
					</div>
					<div style={ styles.balanceContainer }>
						<span style={ styles.left }>Recent Activity</span><span style={ styles.right }>Balance</span>
					</div>
					<TransactionList data={this.props.data} length={this.state.transactionListLength}/>
					<input value='More' type='submit' onClick={this.handleSubmit} />
				</div>
			)
		} else {
				return <div className="TransactionInfo">My Savings History as of <Time /></div>
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