import Promise from 'promise-polyfill'
import rivetsConfig from '../vendor/rivetsConfig'
import tables from '../lib/tables'
import getData from '../utils/getData'
import _ from 'lodash'

export default function () {
  return new Promise((resolve, reject) => {
    const settings = {
      selectors: {
        tableSelector: '#coins'
      }
    }
    rivetsConfig()

    // Get the data before executing anything else
    getData.coins((data) => {
      cryptos.coins = _.chain(data.Data)
        .values()
        .map((o) => {
          o.ImageUrl = typeof o.ImageUrl !== 'undefined' ? 'https://www.cryptocompare.com' + o.ImageUrl + '?width=25' : o.ImageUrl
          return o
        })
        .value()

      const bindRivets = function () {
        return rivets.bind($(settings.selectors.tableSelector), {
          coins: cryptos.coins
        })
      }

      $.when(bindRivets()).done(function () {
        tables.init(settings.selectors.tableSelector)
        resolve('success')
      })
    })
  })
}
