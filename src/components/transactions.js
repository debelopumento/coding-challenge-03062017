import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import store from '../store'
import axios from 'axios'
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
		if(this.props.data != null) {
			return (
				<div>
					<div style={ styles.title }><span>My Savings History as of </span><Time /></div>
					<div><span style={ styles.balances }>Current Balance: </span><span style={ styles.currentBalance }>${this.props.data.currentBalance} </span><span style={ styles.availableBalance }>(${this.props.data.availableBalance} Available)</span></div>
					<div><span style={ styles.left }>Recent Activity</span><span style={ styles.right }>Balance</span></div>
					<TransactionList data={this.props.data}/>
				</div>
			)
		} else {
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