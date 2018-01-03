// import whatInput from 'what-input';
import './vendor/foundation-core.js'
import rivets from 'rivets'
import params from './utils/params'
import tools from './lib/tools'
import Home from './pages/Home'
import Coins from './pages/Coins'
import Research from './pages/Research'
import './utils/newCoin'

/**
 * Methods available to the browser
 * @type {Object}
 */
window.rivets = rivets
window.$ = $
window.cryptos = {
  params: params,
  price: {},
  marketData: [],
  coins: []
}

/**
 * Defining functions available to be initialized onload
 * @type {Object}
 */
const pageFunctions = {
  Home: Home,
  Research: Research,
  Coins: Coins
}

/**
 * Initialize page specific functions
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
document.addEventListener('DOMContentLoaded', function (event) {
  const page = document.getElementById('main')
  const pageName = page.dataset.page
  if (page.dataset.page) {
    // Make sure we have market data before executing anything
    pageFunctions[pageName]()
      .then((result) => {
        tools()
      })
  } else {
    tools()
  }
})
