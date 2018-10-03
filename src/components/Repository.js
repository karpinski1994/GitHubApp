
import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';

const repository = (props) => {
  return (
    <View>
      <Text>{props.name} </Text>
      <Text>{props.stars}</Text>
    </View>
  );
};

repository.defaultProps = {
  name: null,
  stars: null,
};

repository.propTypes = {
  name: PropTypes.string,
  stars: PropTypes.number,
};

export default repository;
