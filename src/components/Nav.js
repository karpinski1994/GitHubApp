import React from 'react';
import PropTypes from 'prop-types';
import {View, Button, StyleSheet} from 'react-native';

const nav = (props) => {
  return (
    <View style={styles.nav}>
      <Button style={styles.navBtn} onPress={props.openProfileListBarTab} title="Profiles List" />
      <Button style={styles.navBtn} onPress={props.openSearchBarTab} title="Users Search" />
      <Button onPress={props.logout}  title="Logout" />
    </View>
  );
};

export default nav;

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    backgroundColor: '#6c90bf',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  navBtn: {
    backgroundColor: '#9f90bf',
    padding: 10,
  },
});
