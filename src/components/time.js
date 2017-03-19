
import React, { PureComponent } from 'react';

class Time extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <span className='Time'>
        {this.state.date.toLocaleTimeString()}
      </span>
    );
  }
}


export default Time