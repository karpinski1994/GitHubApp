import { connect } from 'react-redux';
import React, { Component } from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import userService from '../services/userService';
import localStorage from '../services/localStorage';

import User from './User';

class ProfilesSearch extends Component {
  static propTypes = {
    addUser: PropTypes.func.isRequired,
    actualProfileList: PropTypes.array.isRequired,
    // classList: PropTypes.string,
  }

  // static defaultProps = {
  //   classList: styles.ProfilesSearchContainerModal,
  // }

  constructor(props) {
    super(props);
    this.state = { userName: '', users: [] };
  }

  getUsers = () => {
    userService.getUsers(this.state.userName)
      .then((u) => {
        this.setState({ users: u });
      });
  }

  addProfileHandler = (id) => {
    const user = this.state.users.find(u => u.id === id);
    this.props.addUser(user);
    localStorage.updateProfiles([...this.props.actualProfileList, user]);
  }

  render() {
    const users = this.state.users;
    if (users) {
      users.filter((u) => {
        return !this.props.actualProfileList.find(i => i.id === u.id);
      });
    }
    const isSearch = true;

    return (
      <View styles={styles.container}>
        <Text>Look for users:</Text>
        <TextInput style={styles.input} value={this.state.userName} onChangeText={(text) => this.setState({userName: text})} />
        <Button onPress={this.getUsers}
          title="Search"
        />
        <Text style={styles.heading}>Users list:</Text>
        <View>
            {users ? users.map((user) => {
              return (
                <User
                key={Math.random().toString(36).substr(2, 9)}
                  login={user.login}
                  addProfile={() => this.addProfileHandler(user.id)}
                  isSearch={isSearch}
                />
              );
            }) : null}
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({
    actualProfileList: state.profileList,
  }),
  dispatch => ({
    addUser: (user) => {
      dispatch({
        type: 'ADD_PROFILE',
        profile: user,
      });
    },
  }),
)(ProfilesSearch);

const styles = StyleSheet.create({
  input: {
    borderColor: 'gray',
     borderWidth: 1,
      borderColor: "steelblue",
      marginBottom: 20,
      marginTop:20,
      padding: 5,
  },
  container: {
    flex: 1
  },
  heading: {
    marginTop:20,
  }
});