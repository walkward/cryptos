// import whatInput from 'what-input';
import './vendor/foundation-core.js'
import rivets from 'rivets'
import updateData from './utils/updateData'
import data from './utils/data'
import tools from './lib/tools'
import Home from './pages/Home'
import Trends from './pages/Trends'

/**
 * Methods available to the browser
 * @type {Object}
 */
window.rivets = rivets
window.$ = $
window.cryptos = {
  data: data,
  marketData: []
}

/**
 * Defining functions available to be initialized onload
 * @type {Object}
 */
const pageFunctions = {
  Home: Home,
  Trends: Trends
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
    updateData()
      .then((result) => {
        return pageFunctions[pageName]()
      })
      .then((result) => {
        tools()
      })
  }
})
