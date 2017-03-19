import React from 'react'
import reactCSS from 'reactcss'
const styles = reactCSS({
		'default': {
			transactionContainer: { 
			    display: 'block',
			    backgroundColor: '#eeeeee',
			    width: '340px',
			    height: '37px',
			    margin: 'auto',
			    borderBottom: 'solid 1px lightgrey',
			    padding: '5px',
			    paddingTop: '10px',
			    color: '#666666',
			    fontSize: '14px',
			},
			transactionContainerRow: {
				width: '100%',
				display: 'inline-block',
				textAlign: 'left'
			},
			left: {
				width: '20%',
				textAlign: 'right',
				float: 'left',
				paddingRight: '0px',
			},
			right: {
				textAlign: 'right',
				marginRight: '5px',
				float: 'right',
			},
			center: {
				marginLeft: '20px',
				paddingLeft: '0',
			},
			pending: {
				fontWeight: 'bold',
				color: '#555555'
			}

		}
	})

const Transaction = (props) => {
	
	return (
		<container className='Transaction' style={ styles.transactionContainer }>
			<div id='transactionDetailLineOne' style={ styles.transactionContainerRow }>
				<span style={ styles.left }>{props.date}</span>
				<span style={ styles.center }>${props.amount} {props.type} </span><span style={ styles.pending }>{props.pending}</span>
				<span style={ styles.right }>${props.balance.toFixed(2)}</span>
			</div>
			<div id='transactionDetailLineTwo' style={ styles.transactionContainerRow }>
				<span style={ styles.left }>{props.time}</span>
				<span style={ styles.center }>{props.description}</span>
				<span style={ styles.right }> </span>
			</div>
		</container>
	)
}

export default Transaction