import { AsyncStorage } from "react-native";
import usersService from "./userService";
import store from '../stores/store';

const localStorage = {
  updateProfiles(users) {
    AsyncStorage.setItem('users', JSON.stringify(users));
  },

  getProfiles() {
    return AsyncStorage.getItem('users');
  },

  setToken(token) {
    AsyncStorage.setItem('token', JSON.stringify(token));
  },

  unsetToken() {
    AsyncStorage.removeItem('token');
  },

  getToken() {
    return AsyncStorage.getItem('token');
  },

  expandNewProfile (sourceProfile) {
    usersService.getRepos(sourceProfile.repos_url)
      .then((repos) => {
        const newProfile = { ...sourceProfile };
        newProfile.repos = repos;
        newProfile.wasShown = true;
        store.dispatch({
          type: 'UPDATE_PROFILE',
          profile: newProfile,
        });

      });
  },
};

export default localStorage;