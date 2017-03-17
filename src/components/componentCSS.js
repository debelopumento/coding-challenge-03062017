import reactCSS from 'reactcss'

const styles = reactCSS({
	      'default': {
	        inputContainer: { 
	            textAlign: 'left',
	            backgroundColor: '#dddddd',
	            height: '80px',
	            width: '340px',
	            margin: 'auto',
	            marginTop: '15px',
	            padding: '5px',

	        },
	        inputContainerText: {
	        	margin: '8px',
	        	fontWeight: 'bold',
	            transform: 'scaleY(0.9)',
	            color: '#555555',
	            marginBottom: '5px'
	        },
	        inputBox: {
	        	height: '35px',
	        	width: '190px',
	        	marginLeft: '8px',
	        	border: 'solid black 1px',
	        	backgroundColor: 'white',
	        	paddingLeft: '8px',
	        	paddingTop: '7px',
	        	fontSize: '22px'

	        },
	        submitButton: {
	        	height: '44px',
	        	width: '115px',
	        	backgroundColor: 'white',
	        	fontWeight: 'bold',
	        	border: 'solid black 1px',
	        	float: 'right',
	        	marginRight: '8px',
	        	fontSize: '15px'

	        }
	      }
	    })

export default styles