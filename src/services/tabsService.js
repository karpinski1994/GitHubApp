import Profile from '../components/Profile';
import ProfilesSearch from '../components/ProfilesSearch';
import ProfilesList from '../components/ProfilesList/UsersList';

import userService from '../services/userService';
import compareObjects from '../utils/compareObjects';

import store from '../stores/store';


class TabsService {
  constructor() {
    this.tabsComponents = [
      {
        tabType: 'search',
        component: ProfilesSearch,
      },
      {
        tabType: 'profiles-list',
        component: ProfilesList,
      },
      {
        tabType: 'profile',
        component: Profile,
      },
    ];
  }

  openTabDispatcher = (index) => {
    console.log('------------------------------')
    console.log('tabsService.js -> openTabDispatcher()')
    console.log(Date.now());
    store.dispatch({
      type: 'OPEN_TAB',
      activatedTabIndex: index,
    });
  }

  createTabDispatcher = (tab) => {
    store.dispatch({
      type: 'CREATE_TAB',
      data: tab,
    });
  }

  closeTabDispatcher = (tab) => {
    store.dispatch({
      type: 'CLOSE_TAB',
      data: tab,
    });
  }

  getComponent = (data) => {
    const foundTab = this.tabsComponents.find(comp => comp.tabType === data.tabType);
    return foundTab.component;
  };

  closeTab = (tab) => {
    this.closeTabDispatcher(tab);
    const tabsList = [...store.getState().tabsList];
    const tabToBeSet = tabsList[tabsList.length - 1];
    if (tabsList.length > 0 && tabToBeSet) {
      // this.setUrl(tabToBeSet);
    } else {
      // this.setUrl({ tabType: '', data: {} });
    }
  }

  openTab = (tab, fromPopState) => {
    console.log('------------------------------')
    console.log('tabsService.js -> openTab()')
    console.log(Date.now());
    const existingTabIndex = store.getState().tabsList.findIndex(t => compareObjects(t, tab));
    if (existingTabIndex === -1) {
      this.createTabDispatcher(tab);
      // this.setUrl(tab);
    } else {
      this.activateTab(tab, fromPopState);
    }
  }

  activateTab = (tab, fromPopState) => {
    console.log('------------------------------')
    console.log('tabsService.js -> activateTab()')
    console.log(Date.now());
    const existingTabIndex = store.getState().tabsList.findIndex(t => compareObjects(t, tab));
    this.openTabDispatcher(existingTabIndex);
    if (!fromPopState) {
      // this.setUrl(tab);
    }
  }

  // setUrl = (tab) => {
  //   let pushedUrl = tab.tabType;
  //   if (tab.data.id) {
  //     pushedUrl = `${tab.tabType}/${tab.data.id}`;
  //   }
  //   window.history.pushState({}, '', pushedUrl);
  // }

  // parseUrl = () => {
  //   const location = document.location.pathname;
  //   let tabType;
  //   let id;
  //   let data;
  //   if (location.includes('profile/')) {
  //     const matches = /\/(.+)\/(.+)?/g.exec(location);
  //     [, tabType, id] = matches;
  //     id = Number(id);
  //     data = { tabType, data: { id } };
  //   // } else if (location.includes('login')) {
  //   //   data = { tabType: 'search', data: {} };
  //   // }
  //   } else {
  //     tabType = location.replace('/', '');
  //     data = { tabType, data: {} };
  //   }

  //   return data;
  // }
}

const tabsService = new TabsService();

// window.addEventListener('popstate', () => {
//   const urlData = tabsService.parseUrl();
//   tabsService.openTab(urlData, true);
// });

export default TabsService;
