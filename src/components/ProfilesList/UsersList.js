import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import User from '../User';
import TabsService from '../../services/tabsService';
import {View, Text} from 'react-native';

class ProfilesList extends Component {
  static propTypes = {
    usersFromStore: PropTypes.array.isRequired,
  };
  constructor() {
    super();
    this.tabsService = new TabsService();
  }
  showProfileHandler = (id) => {
    this.tabsService.openTab({ tabType: 'profile', data: { id } });
  }

  render() {
    console.log('------------------------------')
    console.log('UsersList.js -> render()')
    console.log(Date.now());
    const isSearch = false;
    const profiles = this.props.usersFromStore  ? (
       this.props.usersFromStore.map(profile => {
         return (
        <View key={profile.id}>
          <User
            id={profile.id}
            login={profile.login}
            isSearch={isSearch}
            showProfile={() => this.showProfileHandler(profile.id)}
          />
        </View>)
      })
    ) : null;

    return (
      <View>
        <Text>Profiles List:</Text>
        <View>
          {profiles}
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    usersFromStore: state.profileList,
    profile: state.profile,
    tabsList: state.tabsList,
  };
}

export default connect(mapStateToProps)(ProfilesList);
