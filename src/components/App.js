/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
// import {Platform} from 'react-native';

import {Text} from 'react-native';
import Home from './Home';
import Login from './Login';
import { NativeRouter, Route, Switch } from 'react-router-native'
import localStorage from '../services/localStorage';
import { connect } from 'react-redux';
import store from '../stores/store';
// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double'
// });

//DEBUGGER WARNING
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    this.load()
  }

  load = () => {
    localStorage.getToken()
      .then((takenToken) => {
        store.dispatch({
          type: 'SET_TOKEN',
          token: takenToken,
        });
      });

    localStorage.getProfiles()
    .then((profiles) => {
      const updatedProfiles = JSON.parse(profiles);
      store.dispatch({
        type: 'SET_PROFILES',
        profiles: updatedProfiles || [],
      });
      this.setState({
        loaded: true,
      });
    });
  }

  render() {
    console.log('------------------------------')
    console.log('App.js -> render()')
    console.log(Date.now());
    if (!this.state.loaded) {
      return <Text>Loading...</Text>;
    }
    return (
      <NativeRouter>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/home" component={Home} />
        </Switch>
      </NativeRouter>
    );
  }
}



function mapStateToProps(state) {
  return {
    token: state.token,
  };
}
export default connect(mapStateToProps)(App);
