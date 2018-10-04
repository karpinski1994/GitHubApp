import React from 'react';
import PropTypes from 'prop-types';

import {View, Button, StyleSheet} from 'react-native';

const tabIndicator = (props) => {
  let title;
  if(props.data.tabType !== 'profile') {
    title = props.data.tabType;

  } else {
    title = 'profile';
  }
  return (
    <View
      style={styles.indicator}
      key={Math.random().toString(36).substr(2, 9)}
    >
      <Button
        onPress={props.openTab}
        title={title}
        color={props.index === props.openedTab ? 'lightblue' : 'steelblue'}
      />
      <Button
        color="#2064c2"
        style={styles.closeBtn}
        onPress={props.closeTab}
        title="X"
        color={props.index === props.openedTab ? 'skyblue'  : null}
      />
    </View>
  );
};

tabIndicator.propTypes = {
  openTab: PropTypes.func.isRequired,
  closeTab: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  openedTab: PropTypes.number.isRequired,
};

export default tabIndicator;

const styles = StyleSheet.create({
  indicator: {
    flexDirection: 'row',
    height: 35,
    marginRight: 10,
  },
});
