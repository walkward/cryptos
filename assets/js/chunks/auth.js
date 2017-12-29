import store from 'store/dist/store.modern.js';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import key from 'keymaster';

'use strict';

/**
 * Initialize firebase
 */
var config = {
  apiKey: "AIzaSyCartjS5zcMZr-flNNGYZhPxOxu-IyV9S0",
  authDomain: "clique-eb9a9.firebaseapp.com",
  databaseURL: "https://clique-eb9a9.firebaseio.com",
  projectId: "clique-eb9a9",
  storageBucket: "clique-eb9a9.appspot.com",
  messagingSenderId: "389335213679"
};
firebase.initializeApp(config);

window.clique = window.clique || {};


clique.auth = (function() {

  if (store.get('auth_state') == false) {
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
  }

  /**
   * Handles the sign in button press.
   */
  function toggleSignIn() {
    if (firebase.auth().currentUser) {
      // [START signout]
      firebase.auth().signOut();
      // [END signout]
    } else {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Sign in with email and pass.
      // [START authwithemail]
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END authwithemail]
    }
  }

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      store.set('user_photoURL', user.photoURL);
      store.set('user_fullname', user.displayName);
      store.set('auth_state', true);
      return window.location.replace('/index.html');
    } else if (!user && window.location.pathname != '/login/') {
      window.location.replace('/login');
    }
  });

  key.filter = function(event){
    var tagName = (event.target || event.srcElement).tagName;
    key.setScope(/^(INPUT|TEXTAREA|SELECT)$/.test(tagName) ? 'input' : 'other');
    return true;
  }

  // Adding event listener to the enter key
  key('enter', function(){ clique.auth.toggleSignIn() });

  return {
    toggleSignIn: toggleSignIn
  };

})();
