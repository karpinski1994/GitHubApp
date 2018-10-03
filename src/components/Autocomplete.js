import React, {Component} from 'react';
import {TextInput, Text, View} from 'react-native';
import {StyleSheet} from 'react-native';
import userService from '../services/userService';
import User from '../components/User';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = { userName: '', users: [] };
  }

  changeHandler = (text) => {
    this.setState({userName: text});
    userService.getUsers(this.state.userName)
      .then((apiUsers) => {
        this.setState({users: apiUsers});
      });
  }

  render() {
    const users = this.state.users;
    if(users && users.length > 0) {
     users.map(user => (<Text>{user.login}</Text>));
    }
    return (
      <View>
        <TextInput style={styles.input} onChangeText={(text) => this.changeHandler(text)} />
        {users}
      </View>
    );
  }
}

export default Autocomplete;

const styles = StyleSheet.create({
  input: {
    borderColor: 'gray',
     borderWidth: 1,
      borderColor: "steelblue",
      marginBottom: 20,
      marginTop:20,
      padding: 5,
  },
});