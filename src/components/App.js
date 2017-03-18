import React, { Component } from 'react';
import TransactionInfo from './transactions'
import AppHeader from './appHeader'
import SubmitDeposit from './submitDeposit'
import SubmitWithdraw from './submitWithdraw'
import SubmitWinFromTicket from './submitWinFromTicket'
import reactCSS from 'reactcss'


class App extends Component {
  render() {
    const styles = reactCSS({
      'default': {
        app: {
          textAlign: 'center',
        }
      }
    })

    return (
      <div className="App" style={ styles.app }>
        <AppHeader />
        <SubmitDeposit />
        <SubmitWithdraw />
        <SubmitWinFromTicket />
        <TransactionInfo />
      </div>
    );
  }
}



export default App;
