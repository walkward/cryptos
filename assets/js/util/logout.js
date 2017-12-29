/**
 * Logout function available to the browser
 * @type {[type]}
 */

import store from 'store/dist/store.modern.js';

export default function(){

  const logout = Promise.resolve(store.set('auth_state', false));

  logout.then((res) => window.location.replace('/login/'));

}
