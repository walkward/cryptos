import store from 'store/dist/store.modern.js';

function clear(){
  return store.clearAll();
}

function logAll(){
  // Loop over all stored values
  return store.each(function(value, key) {
    console.log(key, '==', value)
  })
}

module.exports = {
  clear: clear,
  logAll: logAll
};
