import Promise from 'promise-polyfill'
import rivetsConfig from '../vendor/rivetsConfig'
import getData from '../utils/getData'
import tables from '../lib/tables'

export default function () {
  return new Promise((resolve, reject) => {
    const settings = {
      selectors: {
        tableSelector: '#marketData'
      }
    }
    rivetsConfig()

    // Get the data before executing anything else
    getData.marketData((data) => {
      cryptos.marketData = data

      const bindRivets = function () {
        return rivets.bind($(settings.selectors.tableSelector), {
          marketData: cryptos.marketData
        })
      }

      $.when(bindRivets()).done(function () {
        tables.init(settings.selectors.tableSelector)
        resolve('success')
      })
    })
  })
}
