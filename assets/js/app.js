// import whatInput from 'what-input';
import './vendor/foundation-core.js';
import store from 'store/dist/store.modern.js';
import split from './vendor/split';
import sidenav from './lib/sidenav';
import url from './util/url';
import data from './util/data';
import Dashboard from './pages/Dashboard';
import GridView from './pages/GridView';
import CompareView from './pages/CompareView';
import List from './pages/List';
import SingleAsset from './pages/SingleAsset';
import FullPage from './pages/FullPage';
import Profile from './pages/Profile';
import Budget from './pages/Budget';
import Tasks from './pages/Tasks';
import FileTypes from './pages/FileTypes';
import SearchView from './pages/SearchView';
import keybindings from './lib/keybindings.js';
import fullscreen from './lib/fullscreen.js';
import logout from './util/logout';
import storage from './util/storage';
import loading from './util/loading';
import viewer from './lib/viewer';
import modal from './lib/modal';
import search from './lib/search';
import notifications from './lib/notifications';

/**
 * Methods available to the browser
 * @type {Object}
 */
window.$ = $;
window.clique = {
  split: split,
  url: url,
  logout: logout,
  storage: storage,
  modal: modal,
  data: data,
  search: search,
  viewer: viewer,
  notifications: notifications,
  loading: loading
};

/**
 * Defining functions available to be initialized onload
 * @type {Object}
 */
const pageFunctions = {
  Dashboard: Dashboard,
  GridView: GridView,
  List: List,
  SingleAsset: SingleAsset,
  CompareView: CompareView,
  FullPage: FullPage,
  Profile: Profile,
  Budget: Budget,
  Tasks: Tasks,
  SearchView: SearchView,
  FileTypes: FileTypes
}

/**
 * Initialize page specific functions
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
document.addEventListener("DOMContentLoaded", function(event) {
  const page = document.getElementById('main');
  const pageName = page.dataset.page;
  if (page.dataset.page) {
    const init = pageFunctions[pageName]();
    Promise.all([ init ]).then(values => {
      document.getElementById('main').style.visibility='visible';
    });
  }
});

/**
 * Checking to see if user is logged in & conditionally loading the auth scripts
 * @param  {[type]} store [description]
 * @return {[type]}       [description]
 */
if(store.get('auth_state') != true || store.get('auth_state') == 'false') {System.import('./chunks/auth')}
