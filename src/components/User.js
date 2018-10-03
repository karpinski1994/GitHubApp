import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View, Button, Text, StyleSheet} from 'react-native';

const user = (props) => {
  let btn;
  let createdDate;

  if (props.isSearch) {
    btn = (
      <Button onPress={props.addProfile} title="Add User" />
    );
  } else {
    btn = (
      <Button onPress={props.showProfile} title="Show Profile" />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.user}>
      <Text>profile: </Text>
      <Text>{props.login}</Text>
      {createdDate}
      <View>
        {btn}
      </View>
    </ScrollView>
  );
};

user.defaultProps = {
  addProfile: () => {},
  showProfile: () => {},
};

user.propTypes = {
  login: PropTypes.string.isRequired,
  addProfile: PropTypes.func,
  isSearch: PropTypes.bool.isRequired,
  showProfile: PropTypes.func,
};

export default user;

const styles = StyleSheet.create({
  user: {
    flex: 1,
    backgroundColor: 'powderblue',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
