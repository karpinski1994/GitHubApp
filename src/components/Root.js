import React from 'react';
// import {Platform} from 'react-native';
import { Provider } from 'react-redux';
import store from '../stores/store';
import App from '../components/App';



const root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default root;