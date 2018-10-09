import React, {Component} from 'react';
import {TextInput, Text, View, Modal, TouchableHighlight, Alert} from 'react-native';
import {StyleSheet} from 'react-native';
import { debounce } from 'lodash';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      selectedItem: {},
      items: [],
      modalVisible: false,
    };
    this.debouncedSetItems = debounce(this.setItems, 200);
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedItem !== prevProps.selectedItem) {
      this.setInputValueExternal(this.props.selectedItem[this.props.labelField]);
    }
  }

  setInputValue = (value) => {
    this.setState({ inputValue: value }, () => {
      this.debouncedSetItems();
    });
  };

  setInputValueExternal = (value) => {
    this.setState({ inputValue: value });
  };

  setItems = () => {
    const stateData = this.state.inputValue;
    this.props.dataSourceFn(this.state.inputValue)
      .then((itemsData) => {
        const updStateData = this.state.inputValue;
        if (stateData !== updStateData) {
          return;
        }
        const itemsArray = [...itemsData];
        const newItemsArray = itemsArray.slice(0, this.props.hintsNo);
        this.setState({ items: newItemsArray });
      });
  }

  selectItem = (item) => {
    this.setState({ inputValue: item[this.props.labelField], items: [], selectedItem: item });
    this.toggleModal();
  }

  toggleHints = () => {
    console.log('true');
    this.setState({ areHintsVisible: true });
  }

  toggleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible}, () => {
      if (this.state.modalVisible === true ) {
        if(this.secondTextInput) this.secondTextInput.focus();
      }
    });
    console.log(this.state.modalVisible);
  }

  render() {
    let items = this.state.items;
    if(this.state.inputValue.length > 2 && Array.isArray(items) && items.length > 0) {
      items = items.map(item => {
        return <Text
                style={styles.select}
                onPress={() => this.selectItem(item)}
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
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>

          <View style={{marginTop: 22}}>
            <View>
                <TextInput
                  value={this.state.inputValue}
                  style={styles.input}
                  onChangeText={(text) => this.setInputValue(text)}
                  onSubmitEditing={this.selectItem}
                  ref={(input) => { this.secondTextInput = input; }} withRef
                />
                {items ? <View style={styles.selectsContainer}>
                  {items}
                </View> : null}
              <TouchableHighlight
                onPress={() => this.toggleModal()}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>

        </Modal>
          <TextInput
          style={styles.input}
          placeholder='Insert value'
          onFocus={() => this.toggleModal()}
          value={this.state.inputValue}
          />
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