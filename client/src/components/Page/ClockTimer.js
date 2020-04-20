import React from 'react'
import Moment from 'moment'

class ClockTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleTimeString()
    };
  }
  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      time: new Date().toLocaleTimeString()
    });
  }
  render() {
    return (
      <p className="App-clock">
         {Moment(new Date()).format('MMM DD, YYYY')}    {this.state.time}
      </p>
    );
  }
}

export default ClockTimer