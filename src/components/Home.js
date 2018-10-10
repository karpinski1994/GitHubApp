
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-native';
import {StyleSheet, View, ScrollView} from 'react-native';

import Nav from './Nav';
import TabIndicator from './TabIndicator';
import authorizationService from '../services/authorizationService';

import TabsService from '../services/tabsService';

import Autocomplete from '../components/Autocomplete';

class Home extends Component {
  constructor() {
    super();
    this.tabsService = new TabsService();
    this.state = {
      loggedOut: false,
      passedUsers: [],
      selectedUser: {},
      inputValue: 'Insert value',
    }
  }

  openTabHandler = (tab) => {
    this.tabsService.openTab(tab);
  }

  closeTabHandler = (tab) => {
    this.tabsService.closeTab(tab);
  }

  openSearchHandler = () => {
    this.tabsService.openTab({ tabType: 'search', data: {} });
  }

  openProfileListHandler = () => {
    this.tabsService.openTab({ tabType: 'profiles-list', data: {} });
  }

  logoutHandler = () => {
    authorizationService.logout();
    this.setState({loggedOut: true});
  }

  getUsersData = (userName) => {
    const ownController = new AbortController();
    const ownCtrlSignal = ownController.signal;

    const fetchObj =
    {
      controller: ownController,
      signal: ownCtrlSignal,
      fetch: fetch(
        `https://test-githut-login-app.herokuapp.com/github/search/users?q=${userName}`,
        {
          method: 'GET',
          signal: ownCtrlSignal,
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            authorization: 'be301ef8a55b8a47ae7ef76e36c0c764',
          },
          redirect: 'follow',
          referrer: 'no-referrer',
        },
      )
        .then(response => response.json())
        .then(usersData => usersData.items),
    };

    this.activeFetches.forEach((fetch) => {
      fetch.controller.abort();
    });

    this.activeFetches.push(fetchObj);
    return fetchObj.fetch;
  }
  activeFetches = [];

  onSelectHandler = (user) => {
    this.setState({ selectedUser: user, inputValue: user.login});
  }

  render() {
    if(this.state.loggedOut) {
      return (<Redirect to="/" />);
    }

    const tabHeaders = this.props.tabsListFromStore.map((tab, index) => {
      return (
        <TabIndicator
          key={Math.random().toString(36).substr(2, 9)}
          openTab={() => this.openTabHandler(tab)}
          closeTab={() => this.closeTabHandler(tab)}
          openedTab={this.props.openedTab}
          data={tab}
          index={index}
        />
      );
    });

    const tabs = this.props.tabsListFromStore.map((tab, index) => {
      const Component = this.tabsService.getComponent(tab);
      return (
        <View
          key={Math.random().toString(36).substr(2, 9)}
          style={index === this.props.openedTab ? styles.visible : styles.invisible}
        >
          <Component data={tab.data} />
        </View>
      );
    });

    return (
      <View style={styles.app}>
        <ScrollView
          contentContainerStyle={styles.tabs}
          horizontal={true}
        >
          {/* header */}
          { tabHeaders }
        </ScrollView>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handle">
          {/* content */}
          { tabs }
          <Autocomplete
            dataSourceFn={(inputValue) => this.getUsersData(inputValue)}
            onSelect={(item) => this.onSelectHandler(item)}
            selectedItem={this.state.selectedUser}
            labelField="login"
            minChars={2}
            hintsNo={8}
          />
        </ScrollView>

        <View style={styles.nav}>
          {/* nav */}
          <Nav
            openProfileListBarTab={() => this.openProfileListHandler()}
            openSearchBarTab={() => this.openSearchHandler()}
            showSearchBarModal={() => this.handleSearchBarModalShow()}
            logout={() => this.logoutHandler()}
          />
        </View>
      </View>
    );
  }

}

function mapStateToProps(state) {
  return {
    usersFromStore: state.profileList,
    profileFromStore: state.profile,
    tabsListFromStore: state.tabsList,
    openedTab: state.activeTab,
  };
}

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  app: {
    flex: 1,
    width: null,
    height: null,
    color: '#ccc',
    backgroundColor: '#666',
    justifyContent: 'flex-start',
    display: 'flex',
  },
  tabs: {
    backgroundColor: '#666',
    height: 100,
  },
  content: {
  },
  nav: {
  },
  invisible: {
    display: 'none',
  },
  visible: {
    display: 'flex',
    backgroundColor: 'powderblue',
    padding: 10,
    flex: 1,
  },
  tabTail: {
    backgroundColor: '#4c90ff',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginRight: 5,
  },
  input: {
    borderWidth: 2,
    borderColor: "#555",
    backgroundColor: '#eee',
    marginTop:20,
    padding: 5,
  },
});