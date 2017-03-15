import React, { Component } from 'react';
import Transactions from './transactions'
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
        <Transactions />
      </div>
    );
  }
}

export default App;
