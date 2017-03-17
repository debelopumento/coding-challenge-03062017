import React, { Component } from 'react';
import reactCSS from 'reactcss'

class AppHeader extends Component {
  
  render() {
    const styles = reactCSS({
      'default': {
        appHeader: {
            backgroundColor: '#dddddd',
            width: '100%',
            height: '60px',
            display: 'block'
        },
        button: {
            float: 'left',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            border: '0px',
            fontSize: '18px',
            marginLeft: '30px',
            marginTop: '20px',
            fontWeight: 'bold',
            transform: 'scaleY(0.9)'
        },
        container: {
            paddingTop: '5px',
        },
        logoContainer: {
            width: '50px',
            height: '22px',
            margin: '0 auto',

            float: 'center'
        },

        logo: {
            backgroundColor: 'white',
            width: '22px',
            height: '22px',
            margin: 'auto',
            border: '1px solid black',
            float: 'left'
        },

        logoRow: {
            
        }

      }
    })

    return (
    	<div style={ styles.appHeader }>
            <div style = { styles.button}><i className="fa fa-angle-left"></i>&nbsp;&nbsp;Back</div>
                <div style={ styles.container }>
                    <div style={ styles.logoContainer }>
        				<div style={ styles.logo }>L</div>
        				<div style={ styles.logo }>N</div>
                    </div>
                    <div style={ styles.logoContainer }>
                        <div style={ styles.logo }>G</div>
                        <div style={ styles.logo }>M</div>
                    </div>
                </div>            
    	</div>
    )
  }
}

export default AppHeader

/*
<div>
                <div style={ styles.logo }>&nbsp;G&nbsp;</div>
                <div style={ styles.logo }>&nbsp;M&nbsp;</div>
            </div>
            */