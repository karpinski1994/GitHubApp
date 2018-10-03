import React, {Component} from 'react';
import {Text} from 'react-native';
import { connect } from 'react-redux';

class NowyKomponent extends Component {
  constructor() {
    super();
    this.state = {
      text: 'abc',
    };
  }
  componentDidMount() {
  }
  render() {
    return (<Text>{this.props.xyz} Tekst ze state: {this.state.text}</Text>);
  }
}

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(NowyKomponent);
