import Promise from 'promise-polyfill'
import rivetsConfig from '../vendor/rivetsConfig'
import getData from '../utils/getData'
import tables from '../lib/tables'
import _ from 'lodash'

export default function () {
  return new Promise((resolve, reject) => {
    const settings = {
      selectors: {
        rivetsSelector: '#allResearch',
        tableSelector: '#allResearchTable'
      }
    }
    rivetsConfig()

    // Get the data before executing anything else
    getData.allResearch((data) => {
      cryptos.allResearch = data.data.allCoins
      cryptos.allResearch = _.map(cryptos.allResearch, (o) => { o.ratingSum = 0; return o })

      // Get prices for each coin before we bind the rivets
      let priceSymbols = _.map(cryptos.allResearch, (o) => { return o.ticker })
      getData.usd(priceSymbols, (data) => {
        cryptos.researchPrices = data

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
  })
}
