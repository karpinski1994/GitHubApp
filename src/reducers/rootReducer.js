import areEqual from '../utils/compareObjects';

const INITIAL_STATE = {
  profileList: [],
  tabsList: [],
  activeTab: -1,
};

function setToken(state, action) {
  return {
    ...state,
    token: action.token,
  };
}

function unsetToken(state) {
  return {
    ...state,
    token: null,
  };
}

function setProfiles(state, action) {
  return {
    ...state,
    profileList: action.profiles,
  };
}

function addProfiles(state, action) {
  const curProfList = [...state.profileList];
  const exIndex = curProfList.findIndex(el => el.id === action.profile.id);
  if (exIndex < 0) {
    return {
      ...state,
      profileList: [...state.profileList, action.profile],
    };
  }
  return {
    ...state,
    profileList: [...state.profileList],
  }

}

function updateProfile(state, action) {
  const newProfileList = [...state.profileList];
  const userIndex = newProfileList.findIndex(u => u.id === action.profile.id);
  const newProfile = { ...action.profile };
  newProfileList[userIndex] = newProfile;
  return {
    ...state,
    profileList: newProfileList,
  };
}

function openTab(state, action) {
  console.log('------------------------------')
  console.log('rootReducer.js -> openTab()')
  console.log(Date.now());
  return {
    ...state,
    activeTab: action.activatedTabIndex,
  };
}

function createTab(state, action) {
  console.log('------------------------------')
  console.log('rootReducer.js -> createTab()')
  console.log(Date.now());
  const newTabsList = [...state.tabsList, {
    ...action.data,
  }];

  return {
    ...state,
    tabsList: newTabsList,
    activeTab: newTabsList.length - 1,
  };
}

function closeTab(state, action) {
  const newTabsList = [...state.tabsList];
  const updTabs = newTabsList.findIndex(t => areEqual(t, action.data));
  newTabsList.splice(updTabs, 1);
  return {
    ...state,
    tabsList: newTabsList,
    activeTab: newTabsList.length - 1,
  };
}

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_PROFILES':
      return setProfiles(state, action);
    case 'SET_TOKEN':
      return setToken(state, action);
    case 'UNSET_TOKEN':
      return unsetToken(state, action);
    case 'ADD_PROFILE':
      return addProfiles(state, action);
    case 'UPDATE_PROFILE':
      return updateProfile(state, action);
    case 'OPEN_TAB':
      return openTab(state, action);
    case 'CREATE_TAB':
      return createTab(state, action);
    case 'CLOSE_TAB':
      return closeTab(state, action);
    default:
      return state;
  }
};

export default rootReducer;
