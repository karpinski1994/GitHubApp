import React, {Component} from 'react';
import {TextInput, Text, View, Picker} from 'react-native';
import {StyleSheet} from 'react-native';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = { itemName: '', items: [] };
  }

  onChangeHandler = (itemNameFromInput) => {
    this.setState({itemName: itemNameFromInput});
    this.props.dataSourceFn(itemNameFromInput)
    .then(data => {
      const dataArray = [...data];
      const newDataArray = dataArray.slice(0, 5);
      this.setState({items: newDataArray})
      console.log(newDataArray);
    });
  }

  onSelectHandler = (itemNameFromInput) => {
    this.props.onSelect(itemNameFromInput);
    this.setState({ itemName: itemNameFromInput, items: [] });
  }

  render() {
    let items = this.state.items;
    if(this.state.itemName.length > 2 && Array.isArray(items) && items.length > 0) {
      items = items.map(item => {
        return <Text
                style={styles.select}
                onPress={() => this.onSelectHandler(item[`${this.props.labelField}`])}
                key={Math.random().toString(36).substr(2, 9)}
                >
                  {item[`${this.props.labelField}`]}
                </Text>
      });
    } else {
      items = null;
    }

    return (
      <View>
        <TextInput
          value={this.state.itemName}
          style={styles.input}
          onChangeText={(text) => this.onChangeHandler(text)}
        />
        {items ? <View style={styles.selectsContainer}>
          {items}
        </View> : null}
      </View>
    );
  }
}

export default Autocomplete;

const styles = StyleSheet.create({
  input: {
      borderWidth: 2,
      borderColor: "#555",
      backgroundColor: '#eee',
      marginTop:20,
      padding: 5,
  },
  selectsContainer: {
    borderWidth: 2,
    borderColor: "#555",
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    marginTop: -2,
  },
  select: {
    backgroundColor: '#eee',
    padding: 5,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
});