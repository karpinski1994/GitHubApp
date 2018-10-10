import React, {Component} from 'react';
import {TextInput, Text, View, Modal, TouchableHighlight, TouchableOpacity, Alert, Dimensions } from 'react-native';
import Svg,{
  Path,
  G
} from 'react-native-svg';
import {StyleSheet} from 'react-native';
import { debounce } from 'lodash';

const { width, height } = Dimensions.get('window');

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
    if (value) {
      this.setState({ inputValue: value });
    } else {
      this.setState({ inputValue: '' });
    }
  };

  clearInput = () => {
    this.setState({ inputValue: '' });
  }

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
    if (item) {
      this.setState({ inputValue: item[this.props.labelField], items: [], selectedItem: item });
      this.props.onSelect(item);
    } else {
      this.props.onSelect({});
    }
    this.toggleModal();
  }

  toggleHints = () => {
    console.log('true');
    this.setState({ areHintsVisible: true });
  }

  toggleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible}, () => {
      if (this.state.modalVisible === true ) {
        if(this.modalTextInput) this.modalTextInput.focus();
      } else {
        if(this.componentTextInput) this.componentTextInput.blur();
      }
    });
    console.log(this.state.modalVisible);
  }

  render() {
    let items = this.state.items;
    console.log('inputValue: ', this.state.inputValue);
    console.log('items: ', this.state.items);
    if(this.state.inputValue.length > this.props.minChars) {
      if (Array.isArray(items) && items.length > 0) {
        items = items.map(item => {
          return <Text
                  style={styles.select}
                  onPress={() => this.selectItem(item)}
                  key={Math.random().toString(36).substr(2, 9)}
                  >
                    {item[this.props.labelField]}
                  </Text>
        });
      }
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
          <View style={styles.navbar}>
            <TouchableHighlight onPress={() => this.toggleModal()}>
              <Svg height="60" width="30">
                <Path
                    d="M10.273,5.009c0.444-0.444,1.143-0.444,1.587,0c0.429,0.429,0.429,1.143,0,1.571l-8.047,8.047h26.554  c0.619,0,1.127,0.492,1.127,1.111c0,0.619-0.508,1.127-1.127,1.127H3.813l8.047,8.032c0.429,0.444,0.429,1.159,0,1.587  c-0.444,0.444-1.143,0.444-1.587,0l-9.952-9.952c-0.429-0.429-0.429-1.143,0-1.571L10.273,5.009z"
                    fill="black"
                />
              </Svg>
            </TouchableHighlight>
            <View style={styles.inputContainer}>
              <TextInput
                value={this.state.inputValue}
                style={styles.input}
                onChangeText={(text) => this.setInputValue(text)}
                onFocus={() => this.setItems()}
                onSubmitEditing={() => this.selectItem()}
                ref={(input) => { this.modalTextInput = input; }} withRef
              />
              {items ? <View style={styles.selectsContainer}>{items}</View> : null}
            </View>
            <TouchableHighlight onPress={() => this.clearInput()}>
              <Svg height="60" width="60">
              <G>
                <Path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26   S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z" style="fill: rgb(216, 0, 39);"></Path>
                <Path d="M35.707,16.293c-0.391-0.391-1.023-0.391-1.414,0L26,24.586l-8.293-8.293c-0.391-0.391-1.023-0.391-1.414,0   s-0.391,1.023,0,1.414L24.586,26l-8.293,8.293c-0.391,0.391-0.391,1.023,0,1.414C16.488,35.902,16.744,36,17,36   s0.512-0.098,0.707-0.293L26,27.414l8.293,8.293C34.488,35.902,34.744,36,35,36s0.512-0.098,0.707-0.293   c0.391-0.391,0.391-1.023,0-1.414L27.414,26l8.293-8.293C36.098,17.316,36.098,16.684,35.707,16.293z" style="fill: rgb(216, 0, 39);"></Path>
              </G>
              </Svg>
            </TouchableHighlight>
          </View>
        </Modal>
        <TouchableOpacity onPress={() => this.toggleModal()}>
          <View pointerEvents="none">
            <TextInput
              value={this.state.inputValue}
              style={styles.input}
              placeholder="Insert value"
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Autocomplete;

const styles = StyleSheet.create({
  navbar: {
    marginTop: 22,
    flexDirection: 'row',
  },
  inputContainer: {
    flexDirection: 'column',
    flex: 1,
    height: 100,
  },
  input: {
      borderWidth: 2,
      borderColor: "#555",
      backgroundColor: '#eee',
      marginTop:20,
      padding: 5,
      flex: 1,
      height: 30,
  },
  selectsContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  select: {
    padding: 5,
    borderColor: '#eee',
    backgroundColor: '#eee',
  },
});