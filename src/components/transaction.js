import React from 'react'
import reactCSS from 'reactcss'


const Transaction = (props) => {
	console.log(24, props.date)
	const styles = reactCSS({
		'default': {
			transactionContainer: { 
			    display: 'block',
			    backgroundColor: '#eeeeee',
			    width: '340px',
			    margin: 'auto',
			    borderBottom: 'solid 1px lightgrey',
			    padding: '5px',
			    color: '#555555',
			    fontSize: '14px',
			},
			left: {
				width: '70px',
				textAlign: 'right',
				float: 'left',
				marginRight: '2px',
				paddingRight: '0px'
			},
			right: {
				width: '60px',
				textAlign: 'right',
				float: 'right',
				marginRight: '5px',
			},
			center: {

			}

		}
	})
	return (
		<div style={ styles.transactionContainer }>
			<div>
				<span style={ styles.left }>{props.date}</span>
				<span style={ styles.center }>${props.amount} {props.type} {props.pending}</span>
				<span style={ styles.right }>${props.balance.toFixed(2)}</span>
			</div>
			<div>
				<span style={ styles.left }>{props.time}</span>
				<span style={ styles.center }>{props.description}</span>
			</div>
		</div>
	)
}

export default Transaction