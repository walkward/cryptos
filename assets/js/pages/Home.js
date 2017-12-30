import tablesorter from 'tablesorter/dist/js/jquery.tablesorter.combined'
// import tablesorterPager from 'tablesorter/dist/js/extras/jquery.tablesorter.pager.min'
import Promise from 'promise-polyfill'
import Big from 'big.js'

export default function () {
  return new Promise((resolve, reject) => {
    // Normal currenty formatting
    rivets.formatters.currency = function (value) {
      return '$' + Big(value).toFixed(4)
    }

    // Removes cents and add commas
    rivets.formatters.number = function (value) {
      value = Math.round(Big(value))
      return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    // Removes cents and add commas
    rivets.formatters.percentage = function (value) {
      return value + '%'
    }

    const bindRivets = function () {
      return rivets.bind($('#marketData'), {
        marketData: cryptos.marketData
      })
    }

    $.when(bindRivets()).done(function () {
      $('#marketData').tablesorter({
        sortList: [[1, 0]],
        widgets: [ 'filter' ],
        widgetOptions: {
          filter_ignoreCase: true
        }
      })
      resolve('success')
    })
  })
}
