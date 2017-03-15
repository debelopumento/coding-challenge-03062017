import React, { Component } from 'react';

class AppHeader extends Component {
  render() {
    return (
    	<div className='appHeader'>
    		<button>Back</button>
    		<div>
    			<tr>
    				<th>L</th>
    				<th>N</th>
    			</tr>
    			<tr>
    				<th>G</th>
    				<th>M</th>
    			</tr>
    		</div>
    	</div>
    )
  }
}

export default AppHeader