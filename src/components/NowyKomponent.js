import React, {Component} from 'react';
import {Text} from 'react-native';
import { connect } from 'react-redux';

import Autocomplete from './Autocomplete';
const APIKEY = '8d3d954eb1b8f16c607e03366e24c17a';
class NowyKomponent extends Component {
  constructor() {
    super();
    this.state = {
      text: 'abc',
    };
  }

  getData = (inputValue) => {
    return fetch(`https://www.food2fork.com/api/search?key=${APIKEY}&q=${inputValue}`)
        .then(response => response.json())
        .then(json =>  {
          return json.recipes;
        })
  }


  onSelectHandler = (item) => {
    console.log(item)
  }


  render() {
    return (
      <Autocomplete
        dataSourceFn={(inputValue) => this.getData(inputValue)}
        onSelect={(item) => this.onSelectHandler(item)}
        selectedItem={this.state.selectedUser}
        labelField="title"
        minChars={4}
        hintsNo={10}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(NowyKomponent);
