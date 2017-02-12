import React, {Component, PropTypes} from "react";
import {Checkbox, Image, List, Icon} from "semantic-ui-react";

import "semantic-ui-checkbox/checkbox.min.css";
import "semantic-ui-image/image.min.css";
import "semantic-ui-list/list.min.css";
import "semantic-ui-icon/icon.min.css";

class Device extends Component {

  handleClick = () => {
    const {index, onToggle} = this.props;
    onToggle(index);
  }

  render() {
    const {name, status} = this.props;
    let color = "red";
    if (status) {
      color = "green";
    }

    return (
      <List.Item>
        <List.Content floated="right">
          <Checkbox toggle onClick={this.handleClick} checked={status}/>
        </List.Content>
        <Image avatar src="http://semantic-ui.com/images/avatar2/small/lena.png"/>
        <List.Content>
          {name}
          <Icon color={color} name="checkmark"/>
        </List.Content>
      </List.Item>
    );
  }
}

Device.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  ip: PropTypes.string.isRequired,
  mac: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default Device;
