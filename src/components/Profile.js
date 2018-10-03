import { connect } from 'react-redux';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';

import Repository from './Repository';
import usersService from '../services/userService';
import localStorage from '../services/localStorage';

class Profile extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    reposUrl: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      repositories: props.profile.repos,
    };
  }

  componentDidMount() {
    if (!this.state.repositories) {
      usersService.getRepos(this.props.reposUrl)
        .then((repos) => {
          this.setState({ repositories: repos });
          localStorage.expandNewProfile(this.props.profile);
        });
    }
  }
  render() {
    let repos = this.state.repositories;
    if (repos !== undefined && Array.isArray(repos)) {
      repos = repos.map(repo => (
        <Repository key={repo.id} name={repo.name} stars={repo.stargazers_count} />
      )) ;
      if(repos.length <= 0) {
        repos = <Text>User has no repositories.</Text>;
      }
    } else {
      repos = <Text>{JSON.stringify(repos)}</Text>;
    }


    return (
      <View>
        <Text>Profile Repos:</Text>
        {repos}
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const Id = ownProps.data.id;
  const profile = state.profileList.find(p => p.id === Id);
  const reposUrl = profile.repos_url;
  return {
    ownProps,
    reposUrl,
    profile,
  };
}

export default connect(mapStateToProps)(Profile);
