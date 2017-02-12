import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../components/Header/Header';
import Home from '../components/Home/Home';
import * as TodoActions from '../actions/index';
import {Container} from 'semantic-ui-react';

class App extends Component {
  render() {
    const {actions} = this.props;
    return (
      <div>
        <Header
          addTodo={actions.addTodo}
          />

        <Container>
          <Home/>
        </Container>
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
