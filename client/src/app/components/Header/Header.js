import React, {PropTypes, Component} from "react";
import {Menu, Icon, Button, Modal} from 'semantic-ui-react';
import "semantic-ui-menu/menu.min.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {activeItem: "home", open: false};
  }

  handleShowClick = size => () => this.setState({size, open: true})
  handleClose = () => this.setState({open: false})
  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  render() {
    const {activeItem, open, size} = this.state;
    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name="home" active={activeItem === "home"} onClick={this.handleItemClick}/>
          <Menu.Item name="servers" active={activeItem === "servers"} onClick={this.handleItemClick}/>
          <Menu.Menu position="right">
            <Menu.Item icon={<Icon name="settings"/>} name="settings" active={activeItem === "settings"} onClick={this.handleShowClick('fullscreen')}/>
          </Menu.Menu>
        </Menu>

        <Modal size={size} open={open} onClose={this.handleClose}>
          <Modal.Header>
            Delete Your Account
          </Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete your account</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative>
              No
            </Button>
            <Button positive icon="checkmark" labelPosition="right" content="Yes"/>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

Header.propTypes = {
  addTodo: PropTypes.func.isRequired
};

export default Header;
