// import whatInput from 'what-input';
import './vendor/foundation-core.js'
import rivets from 'rivets'
// import updateData from './utils/updateData'
import data from './utils/data'
import tools from './lib/tools'
import Home from './pages/Home'
import Trends from './pages/Trends'
import Social from './pages/Social'
import Coins from './pages/Coins'
import Markets from './pages/Markets'

/**
 * Methods available to the browser
 * @type {Object}
 */
window.rivets = rivets
window.$ = $
window.cryptos = {
  data: data,
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
  Trends: Trends,
  Coins: Coins,
  Social: Social,
  Markets: Markets
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
  }
})
