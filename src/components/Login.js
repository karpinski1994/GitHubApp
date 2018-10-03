import {View, Button, StyleSheet, Text, TextInput} from 'react-native';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-native';

import authorizationService from '../services/authorizationService';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
    };
  }

  signIn = () => {
    const data = {
      login: this.state.login,
      password: this.state.password,
    };
    authorizationService.login(data);
  }


  render () {
    let message = '';
    if (this.props.token && !this.props.token.error) {
      this.shouldRenderChildren = false;
      return (<Redirect to="/home" />);
    } else if (this.props.token && this.props.token.error){
      message = 'Invalid credentials.';
    }

    return (
      <View>
        <TextInput placeholder="User's login" onChangeText={(text) => this.setState({login: text})} />
        <TextInput placeholder="User's password" onChangeText={(text) => this.setState({password: text})} />
        <Button
          onPress={() => this.signIn()}
          title="Login" />
          <Text>
            {message}
          </Text>
      </View>
    );
  }
}


function mapStateToProps(state) {
  return {
    token: state.token,
  };
}

export default connect(mapStateToProps)(Login);