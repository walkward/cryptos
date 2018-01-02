import Promise from 'promise-polyfill'
import rivetsConfig from '../vendor/rivetsConfig'
import getData from '../utils/getData'
import tables from '../lib/tables'

export default function () {
  return new Promise((resolve, reject) => {
    const settings = {
      selectors: {
        tableSelector: '#allResearch'
      }
    }
    rivetsConfig()

    // Get the data before executing anything else
    getData.allResearch((data) => {
      cryptos.allResearch = data.data.allCoins

      const bindRivets = function () {
        return rivets.bind($(settings.selectors.tableSelector), {
          allResearch: cryptos.allResearch
        })
      }

      $.when(bindRivets()).done(function () {
        tables.init(settings.selectors.tableSelector)
        resolve('success')
      })
    })
  })
}
