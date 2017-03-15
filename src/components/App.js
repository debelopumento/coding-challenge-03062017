import React, { Component } from 'react';
import Transactions from './transactions'
import AppHeader from './appHeader'
import SubmitTransaction from './submitTransaction'

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader />
        <SubmitTransaction />
        <Transactions />
      </div>
    );
  }
}

export default App;
