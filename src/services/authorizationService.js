import localStorage from '../services/localStorage';
import store from '../stores/store';

const authorizationService = {
  login: (data) => {
    fetch(
      'https://test-githut-login-app.herokuapp.com/api/login',
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(data),
      },
    )
      .then(response => response.json())
      .then((takenToken) => {
        localStorage.setToken(takenToken);
        store.dispatch({
          type: 'SET_TOKEN',
          token: takenToken,
        });
      });
  },

  logout: () => {
    localStorage.unsetToken();
    store.dispatch({
      type: 'UNSET_TOKEN',
    });
  },
};

export default authorizationService;