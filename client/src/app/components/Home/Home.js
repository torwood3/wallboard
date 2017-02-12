import React, {Component} from "react";
import {Grid} from 'semantic-ui-react';
import 'semantic-ui-grid/grid.min.css';

import Clock from "../Clock/Clock";
import Weather from "../Weather/Weather";
import Devices from "../Devices/Devices";

import './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Grid>
          <Grid.Row columns={1} centered>
            <Clock/>
          </Grid.Row>
          <Grid.Row columns={1} centered>
            <Weather city="paris"/>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Devices/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
