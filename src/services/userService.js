const usersSearchApi = 'https://api.github.com/search/users?q=';
const profileApi = 'https://api.github.com/user/';

const usersService = {
  getUsers: (login) => {
    return fetch(usersSearchApi + login)
      .then(response => response.json())
      .then(usersData => usersData.items)
      .then((users) => {
        return users;
      });
  },

  getProfile: (id) => {
    return fetch(profileApi + id)
      .then(response => response.json())
      .then(profile => profile);
  },

  getRepos: (url) => {
    return fetch(url)
      .then(response => response.json())
      .then(repos => repos);
  },
};

export default usersService;
