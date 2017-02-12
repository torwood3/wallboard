import React, {Component} from "react";
import {Header} from "semantic-ui-react";
import "semantic-ui-header/header.min.css";
import moment from 'moment';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: moment().locale('fr').format('LTS').toString(),
      day: moment().locale('fr').format('LL').toString()
    };
  }

  componentWillUnmount = () => {
    if (this.state._timer) {
      clearInterval(this.state._timer);
      this.setState({_timer: null});
    }
  }

  componentDidMount = () => {
    const _time = setInterval(() =>
        this.setState({time: moment().locale('fr').format('LTS').toString()})
      , 1000);
    this.setState({_time});
  }

  render() {
    return (
      <div>
        <Header as="h1" content={this.state.time} subheader={this.state.day}/>
      </div>
    );
  }
}

export default Clock;
