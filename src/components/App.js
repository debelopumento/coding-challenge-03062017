import React, { Component } from 'react';
import TransactionInfo from './transactions'
import AppHeader from './appHeader'
import SubmitDeposit from './submitDeposit'
import SubmitWithdraw from './submitWithdraw'
import SubmitWinFromTicket from './submitWinFromTicket'

class App extends Component {
  render() {
    return (
      <div className="App">
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
