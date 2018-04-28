import React, { Component } from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';
import Login from './Login';
import TeamInfo from './TeamInfo';

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="login" component={Login} title="Login" />
          <Scene key="teamInfo" component={TeamInfo} title="Team" />
        </Stack>
      </Router>
    );
  }
}

export default RouterComponent;
