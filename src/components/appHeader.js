import React, { Component } from 'react';
import reactCSS from 'reactcss'

class AppHeader extends Component {
  

  render() {
    const styles = reactCSS({
      'default': {
        appHeader: {
            backgroundColor: '#dddddd',
            height: '60px'
        },
        button: {
            float: 'left',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            border: '0px',
            fontSize: '18px',
            marginLeft: '30px',
        },
        
        logoContainer: {
            width: '50px',
            margin: 'auto',
        },

        logo: {
            float: 'center',
            backgroundColor: 'white',
            border: '1px solid black',
        },
        

      }
    })

    return (
    	<div className='appHeader' style={ styles.appHeader }>
    		<div>
                <i className="fa fa-angle-left"></i>
                <button style={ styles.button }>Back</button>
    		</div>
            <div style={ styles.logoContainer }>
    			<div>
    				<span style={ styles.logo }>L</span>
    				<span style={ styles.logo }>N</span>
    			</div>
    			<div>
    				<span style={ styles.logo }>G</span>
    				<span style={ styles.logo }>M</span>
    			</div>
    		</div>
    	</div>
    )
  }
}

export default AppHeader