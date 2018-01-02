import Promise from 'promise-polyfill'
import rivetsConfig from '../vendor/rivetsConfig'
import getData from '../utils/getData'
import tables from '../lib/tables'

export default function () {
  return new Promise((resolve, reject) => {
    const settings = {
      selectors: {
        tableSelector: '#newsFeed'
      }
    }
    rivetsConfig()

    // Get the data before executing anything else
    getData.news(cryptos.params.query, cryptos.params.page, (data) => {
      cryptos.news = data.articles

      const bindRivets = function () {
        return rivets.bind($(settings.selectors.tableSelector), {
          news: cryptos.news
        })
      }

      $.when(bindRivets()).done(function () {
        // Initialize the tablesorter
        tables.init(settings.selectors.tableSelector)
        // Re-initialize foundation to make sure equalizer is working
        $(settings.selectors.tableSelector).foundation()
        resolve('success')
      })
    })

    // Add an active selector to the pagination
    $('[data-pagination="' + cryptos.params.page + '"]').addClass('current')
  })
}
