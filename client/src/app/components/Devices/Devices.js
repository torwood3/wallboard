import React, {Component} from "react";
import {List, Button} from "semantic-ui-react";
import {fetchDevices, toggleDevice} from '../../actions/index';

import 'semantic-ui-list/list.min.css';
import 'semantic-ui-button/button.min.css';

import Device from "../Device/Device";

class Devices extends Component {
  constructor(props) {
    super(props);
    this.state = {devices: []};
  }

  fetchData = () => {
    fetchDevices()
      .then(response => {
        console.log(response);
        this.setState({devices: response.data.devices});
      });
  }

  handleToggle = index => {
    let action = '';

    if (this.state.devices[index].status) {
      action = 'poweroff';
    } else {
      action = 'wol';
    }

    toggleDevice(action, this.state.devices[index].id)
      .then(response => {
        console.log(response);
        this.fetchData();
      });
  }

  handleRefresh = () => {
    this.fetchData();
  }

  componentWillMount = () => {
    this.fetchData();
  }

  render() {
    const rows = [];
    this.state.devices.forEach((device, index) => {
      rows.push(<Device key={index} index={index} {...device} onToggle={::this.handleToggle}/>);
    });

    return (
      <div>
        <Button onClick={this.handleRefresh}>Refresh</Button>
        <List divided verticalAlign="middle">
          {rows}
        </List>
      </div>
    );
  }
}

export default Devices;
